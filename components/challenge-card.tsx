"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Challenge } from "@prisma/client";
import { formatDate } from "date-fns";
import { useRouter } from "next/navigation";

interface ChallengeCardProps {
  challenge: Challenge & {
    participantCount: number;
  };
}

export const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  const router = useRouter();

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
                {formatDate(new Date(challenge.startDate), "dd/MM/yyyy")}
              </time>
              <span className="text-xs text-muted-foreground opacity-70">
                ·
              </span>
              <time
                className="text-xs text-muted-foreground opacity-70"
                dateTime={challenge.endDate?.toISOString()}
              >
                {challenge.endDate &&
                  formatDate(new Date(challenge.endDate), "dd/MM/yyyy")}
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

          <Button
            onClick={() => router.push(`/challenges/${challenge.id}`)}
            size={"sm"}
          >
            View
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
