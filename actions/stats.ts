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

/**
 * @param challengeId
 * @returns total number of goals, total number of participants, total number of completed goals
 */
export async function getParticipantsPercentage(challengeId: string) {
  const stats = await getStats(challengeId);

  const percentage = (stats.totalParticipants / stats.maxParticipants) * 100;
  return Number(percentage.toFixed(2));
}

interface GoalGroup {
  date: string;
  completedGoals: number;
  totalGoals: number;
}

interface GoalsByDate {
  [key: string]: GoalGroup;
}

/**
 * @param challengeId
 * @returns array of goals grouped by date
 */
export async function getAllGoals(challengeId: string) {
  try {
    const goals = await prisma.goal.findMany({
      where: {
        challengeId: challengeId,
        isCompleted: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const groupedGoals = goals.reduce((acc: GoalsByDate, goal) => {
      const date = goal.createdAt.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = {
          date: date,
          completedGoals: 0,
          totalGoals: 0,
        };
      }
      acc[date].completedGoals++;
      acc[date].totalGoals++;
      return acc;
    }, {});

    return Object.values(groupedGoals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw error;
  }
}
