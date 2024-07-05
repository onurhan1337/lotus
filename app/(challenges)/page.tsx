import type { Metadata } from "next";

import { getAllChallenges } from "@/actions/challenge";
import { ChallengesList } from "@/components/challenges-list";
import Container from "@/components/layout/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cache } from "react";

export const metadata: Metadata = {
  title: "Challenges",
  description: "List of all challenges",
};

const loadChallenges = cache(async () => {
  return await getAllChallenges();
});

export default async function ChallengesPage() {
  const challenges = await loadChallenges();

  return (
    <Container title="Challenges">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="joined">Joined</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ChallengesList challenges={challenges} />
        </TabsContent>
        <TabsContent value="joined">
          <ChallengesList challenges={challenges} filter="joined" />
        </TabsContent>
        <TabsContent value="completed">
          <ChallengesList challenges={challenges} filter="completed" />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
