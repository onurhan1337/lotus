import prisma from "@/lib/prisma";

/**
 * @param challengeId
 * @returns total number of goals, total number of participants, total number of completed goals
 */

export async function getStats(challengeId: string) {
  try {
    const participantsCount = await prisma.challengeParticipant.count({
      where: {
        challengeId: challengeId,
      },
    });

    const maxParticipants = await prisma.challenge.findFirst({
      where: {
        id: challengeId,
      },
      select: {
        maxParticipants: true,
      },
    });

    const [goalsCount, completedGoalsCount] = await prisma.$transaction([
      prisma.goal.count({
        where: {
          challengeId: challengeId,
        },
      }),
      prisma.goal.count({
        where: {
          challengeId: challengeId,
          isCompleted: true,
        },
      }),
    ]);

    return {
      totalGoals: goalsCount,
      totalParticipants: participantsCount,
      maxParticipants: maxParticipants?.maxParticipants ?? 0,
      totalCompletedGoals: completedGoalsCount,
    };
  } catch (error: any) {
    console.error("Failed to get challenge stats:", error);
    throw error;
  }
}

// compare the participants count with the max participants count and give a percentage
export async function getParticipantsPercentage(challengeId: string) {
  const stats = await getStats(challengeId);

  return (stats.totalParticipants / stats.maxParticipants) * 100;
}
