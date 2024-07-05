import type { Metadata } from "next";

import { getChallenge } from "@/actions/challenge";
import { getGoals } from "@/actions/goal";
import { getDailyParticipants } from "@/actions/stats";
import { AddGoalDialogProps } from "@/components/add-goal-dialog";
import { ChallengeTotalGoalsChart } from "@/components/challenge-total-goals-chart";
import { FeedsSheetProps } from "@/components/feed-sheet";
import Container from "@/components/layout/container";
import { MyGoals } from "@/components/my-goals";
import {
  MaxParticipantsChart,
  ParticipantsChart,
} from "@/components/participants-charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { cache } from "react";

const FeedsSheet = dynamic<FeedsSheetProps>(() =>
  import("@/components/feed-sheet").then((m) => m.FeedsSheet)
);

const AddGoalDialog = dynamic<AddGoalDialogProps>(
  () => import("@/components/add-goal-dialog").then((m) => m.AddGoalDialog),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Challenge",
  description: "A challenge",
};

const loadChallenge = cache(async (id: string) => {
  return await getChallenge(id);
});

export default async function ChallengeDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { userId } = auth();
  const { id } = params;
  const challenge = await loadChallenge(id);
  const participantsPercentage = await getDailyParticipants(id);

  const isJoined = challenge?.participants.some(
    (participant) => participant.userId === userId
  );

  if (!userId || !challenge || !isJoined) {
    notFound();
  }

  if (challenge.isActive === "INACTIVE" || challenge.isActive === "COMPLETED") {
    notFound();
  }

  const { data: goals } = await getGoals(userId, challenge.id);

  return (
    <Container title={challenge.name}>
      <Tabs defaultValue="overview" className="w-full">
        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <FeedsSheet feedChallengeId={id} />
            <AddGoalDialog challengeId={id} />
          </div>
        </div>

        <TabsContent value="overview">
          <div
            className={
              "grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            }
          >
            <div className="col-span-1 sm:col-span-2 h-full">
              <ChallengeTotalGoalsChart challengeId={id} />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-1 gap-y-4 md:gap-x-4 md:gap-y-4 sm:gap-y-10 flex flex-col">
              <ParticipantsChart
                value={challenge.participants.length}
                participantsPercentage={participantsPercentage}
              />
              {challenge.maxParticipants && challenge.maxParticipants > 0 && (
                <MaxParticipantsChart
                  value={challenge.participants.length}
                  maxParticipants={challenge.maxParticipants}
                />
              )}
            </div>
            <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-1 h-full">
              <MyGoals goals={goals} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="participants">
          <div className={"flex flex-col space-y-4"}>
            <p>Coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
