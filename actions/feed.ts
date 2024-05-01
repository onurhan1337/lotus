"use server";

import prisma from "@/lib/prisma";
import { createFeedSchema } from "@/zod/schemas/feed";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

/**
 * Create a new feed
 * @param data - Feed data
 * @returns Created feed
 * @throws Error
 */

interface CreateFeedParams {
  data: {
    text: string;
  };
  userId: string;
  feedChallengeId: string;
}

export async function createFeed(
  data: CreateFeedParams["data"],
  userId: CreateFeedParams["userId"],
  feedChallengeId: CreateFeedParams["feedChallengeId"]
) {
  try {
    const validatedData = createFeedSchema.parse(data);

    const feedData: Prisma.FeedCreateInput = {
      text: validatedData.text,
      userId,
      challenge: {
        connect: {
          id: feedChallengeId,
        },
      },
      createdAt: new Date(),
    };

    const feed = await prisma.feed.create({
      data: feedData,
    });

    if (!feed) throw new Error("Failed to create feed");

    revalidatePath(`/challenges/${feedChallengeId}`);
    return feed;
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Get all feeds for a challenge
 * @param challengeId - The ID of the challenge
 * @returns All feeds for the challenge
 * @throws Error
 */
export async function getAllFeeds(challengeId: string) {
  try {
    const feeds = await prisma.feed.findMany({
      where: {
        challengeId,
      },
      include: {
        replies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!feeds) throw new Error("No feeds found for the challenge");

    return feeds;
  } catch (error) {
    throw new Error(error as string);
  }
}

/**
 * Delete a feed
 * @param feedId - The ID of the feed to delete
 * @throws Error
 */
export async function deleteFeed(feedId: string) {
  try {
    const feed = await prisma.feed.findUnique({
      where: {
        id: feedId,
      },
    });

    if (!feed) throw new Error("Feed not found");

    await prisma.feed.delete({
      where: {
        id: feedId,
      },
    });

    revalidatePath(`/challenges/${feed.challengeId}`);
    return feed;
  } catch (error) {
    throw new Error(error as string);
  }
}
