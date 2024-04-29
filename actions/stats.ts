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

export interface GoalGroup {
  date: string;
  "Completed Goals": number;
  "Total Goals": number;
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
      },
    });

    const groupedGoals = goals.reduce<Record<string, GoalGroup>>(
      (acc, goal) => {
        const date = goal.createdAt.toISOString().split("T")[0];
        if (!acc[date]) {
          acc[date] = {
            date: date,
            "Completed Goals": 0,
            "Total Goals": 0,
          };
        }
        acc[date]["Total Goals"]++;
        if (goal.isCompleted) {
          acc[date]["Completed Goals"]++;
        }
        return acc;
      },
      {}
    );

    // Convert the object to an array and sort it by date
    const sortedGoals = Object.values(groupedGoals).sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    return sortedGoals;
  } catch (error) {
    console.error("Error fetching goals:", error);
    return [];
  }
}
