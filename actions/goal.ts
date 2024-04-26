"use server";

import prisma from "@/lib/prisma";
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
    const goal = await prisma.goal.create({
      data: {
        name: data.name,
        description: data.description,
        userId,
        challengeId,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (!goal) throw new Error("Failed to create goal");

    revalidatePath(`/challenges/${challengeId}`);
    return goal;
  } catch (error) {
    throw new Error(error as string);
  }
}
