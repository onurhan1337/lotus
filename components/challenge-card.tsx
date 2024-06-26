import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Challenge, ChallengeParticipant, Reward } from "@prisma/client";
import { format } from "date-fns";
import dynamic from "next/dynamic";

const ChallengeDetailDialog = dynamic(() =>
  import("@/components/challenge-detail-dialog").then(
    (mod) => mod.ChallengeDetailDialog
  )
) as React.FC<{
  challenge: Challenge & {
    participantCount: number;
    rewards: Reward[];
    participants: ChallengeParticipant[];
  };
}>;

interface ChallengeCardProps {
  challenge: Challenge & {
    participantCount: number;
    rewards: Reward[];
    participants: ChallengeParticipant[];
  };
}

export const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <Card>
      <CardHeader className="h-20">
        <CardTitle>
          <div className={"flex items-center justify-between"}>
            {challenge.name}
            <div className={"flex items-center space-x-1"}>
              <time
                className="text-xs text-muted-foreground opacity-70"
                dateTime={challenge.startDate.toISOString()}
              >
                {format(new Date(challenge.startDate), "dd/MM/yyyy")}
              </time>
              <span className="text-xs text-muted-foreground opacity-70">
                ·
              </span>
              <time
                className="text-xs text-muted-foreground opacity-70"
                dateTime={challenge.endDate?.toISOString()}
              >
                {challenge.endDate &&
                  format(new Date(challenge.endDate), "dd/MM/yyyy")}
              </time>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-20 tracking-tight leading-none">
        <p className="text-sm text-muted-foreground">{challenge.description}</p>
      </CardContent>
      <CardFooter className="h-20">
        <div className="w-full flex justify-between items-center">
          <div>
            {challenge.maxParticipants ? (
              <div className={"flex items-center space-x-1"}>
                <span className={"text-xs text-muted-foreground"}>
                  Participants:
                </span>
                <span
                  className={"text-xs text-muted-foreground"}
                >{`${challenge.participantCount} / ${challenge.maxParticipants}`}</span>
              </div>
            ) : (
              <div className={"flex items-center space-x-1"}>
                <span className={"text-xs text-muted-foreground"}>
                  Participants:
                </span>
                <span className={"text-xs text-muted-foreground"}>
                  {challenge.participantCount}
                </span>
              </div>
            )}
          </div>

          <ChallengeDetailDialog challenge={challenge} />
        </div>
      </CardFooter>
    </Card>
  );
};
