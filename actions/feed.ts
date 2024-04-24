"use server";

import prisma from "@/lib/prisma";

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
  id: string;
}

export async function createFeed(
  data: CreateFeedParams["data"],
  userId: CreateFeedParams["userId"],
  id: CreateFeedParams["id"]
) {
  try {
    const feed = await prisma.feed.create({
      data: {
        text: data.text,
        userId,
        challengeId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (!feed) throw new Error("Failed to create feed");

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
    });

    if (!feeds) throw new Error("No feeds found for the challenge");

    return feeds;
  } catch (error) {
    throw new Error(error as string);
  }
}
