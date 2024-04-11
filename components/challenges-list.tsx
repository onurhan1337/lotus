import { getAllChallenges } from "@/actions/challenge";
import { ChallengeCard } from "@/components/challenge-card";
import { cache } from "react";

const loadChallenges = cache(async () => {
  return await getAllChallenges();
});

export const ChallengesList = async () => {
  const challenges = await loadChallenges();

  return (
    <ul className={"w-full"}>
      <li className={"grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
        {challenges.map((challenge) => (
          <ChallengeCard challenge={challenge} key={challenge.id} />
        ))}
      </li>
    </ul>
  );
};
