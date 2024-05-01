"use server";

import prisma from "@/lib/prisma";
import { createGoalSchema } from "@/zod/schemas/goal";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

/**
 * Create a new goal
 * @param data - Goal data
 * @returns Created goal
 * @throws Error
 */

interface CreateGoalParams {
  data: {
    name: string;
    description: string;
  };
  userId: string;
  challengeId: string;
}

export async function createGoal(
  data: CreateGoalParams["data"],
  userId: CreateGoalParams["userId"],
  challengeId: CreateGoalParams["challengeId"]
) {
  try {
    const validatedData = createGoalSchema.parse(data);

    const goalData: Prisma.GoalCreateInput = {
      name: validatedData.name,
      description: validatedData.description,
      userId,
      challenge: {
        connect: {
          id: challengeId,
        },
      },
      createdAt: new Date(),
    };

    const goal = await prisma.goal.create({
      data: goalData,
    });

    if (!goal) throw new Error("Failed to create goal");

    revalidatePath(`/challenges/${challengeId}`);
    return goal;
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Get all goals of a user
 * @param userId - User id
 * @param challengeId - Challenge id
 * @returns Array of goals
 */
export async function getGoals(userId: string, challengeId: string) {
  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId,
        challengeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!goals) throw new Error("Failed to get goals");

    return { data: goals };
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Update a goal to be completed
 * @param goalId - Goal id
 * @param userId - User id
 * @returns Updated goal
 */
export async function updateGoalStatus(goalId: string, userId: string) {
  try {
    const goal = await prisma.goal.findUnique({
      where: {
        id: goalId,
      },
    });

    if (!goal) throw new Error("Failed to find goal");

    const updatedGoal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        isCompleted: !goal.isCompleted,
        updatedAt: new Date(),
      },
    });

    if (!updatedGoal) throw new Error("Failed to update goal");

    revalidatePath(`/challenges/${updatedGoal.challengeId}`);
    return goal;
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Delete a goal
 * @param goalId - Goal id
 * @returns Deleted goal
 */
export async function deleteGoal(goalId: string) {
  try {
    const goal = await prisma.goal.findUnique({
      where: {
        id: goalId,
      },
    });

    if (!goal) throw new Error("Failed to find goal");

    const deletedGoal = await prisma.goal.delete({
      where: {
        id: goalId,
      },
    });

    if (!deletedGoal) throw new Error("Failed to delete goal");

    revalidatePath(`/challenges/${goal.challengeId}`);
    return goal;
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Gel goal by id
 * @param goalId - Goal id
 * @returns Goal
 */
export async function getGoal(goalId: string) {
  try {
    const goal = await prisma.goal.findUnique({
      where: {
        id: goalId,
      },
    });

    if (!goal) throw new Error("Failed to find goal");

    return goal;
  } catch (error) {
    throw new Error(error as string);
  }
}
