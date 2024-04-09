"use server";

import { createChallengeSchema } from "@/zod/schemas/login";
import prisma from "@/lib/prisma";
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

    const challenge = await prisma.challenge.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        maxParticipants: validatedData.maxParticipants,
        registrationDeadline: validatedData.registrationDeadline,
        startDate: validatedData.dateRange.from,
        endDate: validatedData.dateRange.to,
        createdByUserId: userId,
        isActive: validatedData.isActive,
        rewards: {
          create: validatedData.rewards,
        },
      },
    });

    return challenge;
  } catch (error) {
    throw new Error(error as string);
  }
}
