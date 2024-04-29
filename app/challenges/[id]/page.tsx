import type { Metadata } from "next";

import { getChallenge } from "@/actions/challenge";
import { getParticipantsPercentage } from "@/actions/stats";
import { AddGoalDialog } from "@/components/add-goal-dialog";
import { FeedsSheet } from "@/components/feed-sheet";
import Container from "@/components/layout/container";
import { MyGoals } from "@/components/my-goals";
import {
  MaxParticipantsChart,
  ParticipantsChart,
} from "@/components/participants-charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@clerk/nextjs";
import { cache } from "react";

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
  const participantsPercentage = await getParticipantsPercentage(id);

  if (!userId || !challenge) return null;

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
              "grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
            }
          >
            <div className="col-span-1 sm:col-span-2 w-200 h-200">
              {/* add other items here */}
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-1 gap-y-4 md:gap-x-4 md:gap-y-4 sm:gap-y-10 flex flex-col">
              <ParticipantsChart value={challenge.participants.length} />
              {challenge.maxParticipants && challenge.maxParticipants > 0 && (
                <MaxParticipantsChart
                  maxParticipants={challenge.maxParticipants}
                  value={participantsPercentage}
                />
              )}
            </div>
            <div className="sm:col-span-2 md:col-span-2 lg:col-span-1 h-full">
              <MyGoals userId={userId} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="participants">
          <div className={"flex flex-col space-y-4"}>
            <div className={"flex items-center space-x-2"}>
              <div className={"w-10 h-10 rounded-full bg-green-500"} />
              <div className={"flex flex-col"}>
                <div className={"text-sm font-medium"}>Participant</div>
                <div className={"text-xs text-muted-foreground"}>
                  Participant description
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
