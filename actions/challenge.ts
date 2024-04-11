"use server";

import prisma from "@/lib/prisma";
import { createChallengeSchema } from "@/zod/schemas/login";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Challenge = z.infer<typeof createChallengeSchema>;

/**
 * Create a new challenge
 * @param data - Challenge data
 * @returns Created challenge
 * @throws Error
 */
export async function createChallenge(userId: string, data: Challenge) {
  try {
    const validatedData = createChallengeSchema.parse(data);

    const challengeData: Prisma.ChallengeCreateInput = {
      name: validatedData.name,
      description: validatedData.description,
      registrationDeadline: validatedData.registrationDeadline,
      startDate: validatedData.dateRange.from,
      endDate: validatedData.dateRange.to,
      createdByUserId: userId,
      isActive: validatedData.isActive,
      rewards: {
        create: validatedData.rewards,
      },
    };

    if (validatedData.maxParticipants && validatedData.maxParticipants > 0) {
      challengeData.maxParticipants = validatedData.maxParticipants;
    }

    const challenge = await prisma.challenge.create({
      data: challengeData,
    });

    revalidatePath("/admin/challenges");
    return challenge;
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Retrieves all challenges from the database.
 * @returns {Promise<Challenge[]>} A promise that resolves to an array of challenges.
 * @throws {Error} If there is an error while retrieving the challenges.
 */
export async function getAllChallenges() {
  try {
    const challenges = await prisma.challenge.findMany({
      include: {
        rewards: true,
        participants: true,
      },
    });

    const challengesWithParticipantCount = challenges.map((challenge) => ({
      ...challenge,
      participantCount: challenge.participants.length,
    }));

    return challengesWithParticipantCount;
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Remove a challenge
 * @param challengeId - Challenge ID
 * @returns Removed challenge
 * @throws Error
 */
export async function removeChallenge(challengeId: string) {
  try {
    const rewards = await prisma.reward.findMany({
      where: { challengeId },
    });

    const participants = await prisma.challengeParticipant.findMany({
      where: { challengeId },
    });

    for (const reward of rewards) {
      await prisma.reward.delete({
        where: { id: reward.id },
      });
    }

    for (const participant of participants) {
      await prisma.challengeParticipant.delete({
        where: { id: participant.id },
      });
    }

    await prisma.challenge.delete({
      where: {
        id: challengeId,
      },
    });

    revalidatePath("/admin/challenges");
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Retrieves a challenge from the database by its ID.
 * @param id - The ID of the challenge.
 * @returns {Promise<Challenge>} A promise that resolves to the challenge.
 * @throws {Error} If there is an error while retrieving the challenge.
 */
export async function getChallenge(id: string) {
  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        rewards: true,
      },
    });

    if (!challenge) {
      throw new Error(`No challenge found with the id ${id}`);
    }

    return challenge;
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Edit an existing challenge
 * @param id - The ID of the challenge to edit
 * @param data - New challenge data
 * @returns Updated challenge
 * @throws Error
 */

export async function editChallenge(id: string, data: Challenge) {
  try {
    const validatedData = createChallengeSchema.parse(data);

    const currentChallenge = await prisma.challenge.findUnique({
      where: { id },
      include: { rewards: true },
    });

    if (!currentChallenge) {
      throw new Error(`No challenge found with the id ${id}`);
    }

    const newRewards = validatedData.rewards.filter(
      (reward) => !currentChallenge.rewards.some((r) => r.name === reward.name)
    );
    const existingRewards = validatedData.rewards.filter((reward) =>
      currentChallenge.rewards.some((r) => r.name === reward.name)
    );

    const removedRewards = currentChallenge.rewards.filter(
      (reward) => !validatedData.rewards.some((r) => r.name === reward.name)
    );

    const updatedChallenge = await prisma.challenge.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        maxParticipants: validatedData.maxParticipants,
        registrationDeadline: validatedData.registrationDeadline,
        startDate: validatedData.dateRange.from,
        endDate: validatedData.dateRange.to,
        isActive: validatedData.isActive,
        rewards: undefined,
      },
      include: {
        rewards: true,
      },
    });

    for (const reward of existingRewards) {
      const existingReward = currentChallenge.rewards.find(
        (r) => r.name === reward.name
      );
      if (existingReward) {
        await prisma.reward.update({
          where: { id: existingReward.id },
          data: reward,
        });
      }
    }

    for (const reward of newRewards) {
      await prisma.reward.create({
        data: {
          ...reward,
          challengeId: updatedChallenge.id,
        },
      });
    }

    for (const reward of removedRewards) {
      await prisma.reward.delete({
        where: { id: reward.id },
      });
    }

    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: { rewards: true },
    });

    revalidatePath("/admin/challenges");
    return challenge;
  } catch (error) {
    throw new Error(error as string);
  }
}
