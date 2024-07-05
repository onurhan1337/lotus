import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentDate = new Date();

    const expiredChallenges = await prisma.challenge.findMany({
      where: {
        endDate: {
          lte: currentDate,
        },
        isActive: "ACTIVE",
      },
    });

    if (expiredChallenges.length === 0) {
      return NextResponse.json({
        message: "No expired challenges found",
      });
    }

    const expiredChallengeIds = expiredChallenges.map(
      (challenge) => challenge.id
    );

    await prisma.challenge.updateMany({
      where: {
        id: {
          in: expiredChallengeIds,
        },
      },
      data: {
        isActive: "COMPLETED",
      },
    });

    return NextResponse.json({
      message: "Expired challenges updated",
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error updating challenges.",
      error: error.message,
    });
  }
}
