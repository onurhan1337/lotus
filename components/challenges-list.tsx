import { ChallengeCard } from "@/components/challenge-card";
import { Challenge } from "@prisma/client";

interface ChallengesListProps {
  challenges: (Challenge & { participantCount: number })[];
}
export const ChallengesList = ({ challenges }: ChallengesListProps) => {
  return (
    <ul className={"w-full"}>
      <li className={"grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-3"}>
        {challenges.map((challenge, index) => (
          <ChallengeCard challenge={challenge} key={challenge.id} />
        ))}
      </li>
    </ul>
  );
};
