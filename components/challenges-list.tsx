import { ChallengeCard } from "@/components/challenge-card";
import { auth } from "@clerk/nextjs";
import { Challenge, ChallengeParticipant, Reward } from "@prisma/client";

interface ChallengesListProps {
  challenges: (Challenge & {
    participantCount: number;
    participants: ChallengeParticipant[];
    rewards: Reward[];
  })[];
  filter?: string;
}

export const ChallengesList = ({ challenges, filter }: ChallengesListProps) => {
  const { userId } = auth();
  let filteredChallenges = challenges;

  if (filter === "joined") {
    filteredChallenges = challenges.filter((challenge) =>
      challenge.participants.some(
        (participant) => participant.userId === userId
      )
    );
  }
  3;
  return (
    <ul className={"w-full"}>
      <li className={"grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-3"}>
        {filteredChallenges.map((challenge, index) => (
          <ChallengeCard challenge={challenge} key={challenge.id} />
        ))}
      </li>
    </ul>
  );
};
