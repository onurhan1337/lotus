import prisma from "@/lib/prisma";
import {
  endOfDay,
  format,
  formatISO,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";

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

export async function getDailyParticipants(challengeId: string) {
  const data = [];
  const currentDate = new Date();

  for (let i = 0; i < 30; i++) {
    const date = subDays(currentDate, i);
    const formattedDate = format(date, "MMM dd"); // Tarih formatı 'Mar 01' gibi olacak

    const count = await prisma.challengeParticipant.count({
      where: {
        challengeId: challengeId,
        createdAt: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
    });

    data.push({ date: formattedDate, participants: count });
  }

  return data.reverse(); // Veriyi tarihe göre sırala, en eski gün en başta olacak şekilde
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
      orderBy: {
        createdAt: "asc",
      },
    });

    const groupedGoals = goals.reduce<Record<string, GoalGroup>>(
      (acc, goal) => {
        const date = formatISO(parseISO(goal.createdAt.toISOString()), {
          representation: "date",
        });
        acc[date] = acc[date] || {
          date,
          "Completed Goals": 0,
          "Total Goals": 0,
        };
        acc[date]["Total Goals"]++;
        if (goal.isCompleted) {
          acc[date]["Completed Goals"]++;
        }
        return acc;
      },
      {}
    );

    const sortedGoals = Object.values(groupedGoals);

    return sortedGoals;
  } catch (error) {
    console.error("Error fetching goals:", error);
    return [];
  }
}
