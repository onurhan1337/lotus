import type { Metadata } from "next";

import { getAllChallenges } from "@/actions/challenge";
import { ChallengesList } from "@/components/challenges-list";
import Container from "@/components/layout/container";
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
      <ChallengesList challenges={challenges} />
    </Container>
  );
}
