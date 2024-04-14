"use client";

import { joinChallenge } from "@/actions/challenge";
import { useUser } from "@clerk/nextjs";
import { Challenge, ChallengeParticipant, Reward } from "@prisma/client";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChallengeJoinButton } from "./challenge-join-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface ChallengeDetailDialogProps {
  challenge: Challenge & {
    participantCount: number;
    rewards: Reward[];
    participants: ChallengeParticipant[];
  };
}

export const ChallengeDetailDialog = ({
  challenge,
}: ChallengeDetailDialogProps) => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const isJoined = challenge.participants.some(
    (participant) => participant.userId === user.id
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{challenge.name}</DialogTitle>
          <div
            className={
              "flex items-center space-x-1 text-sm text-muted-foreground"
            }
          >
            <time
              className="text-xs text-muted-foreground opacity-80"
              dateTime={challenge.startDate.toISOString()}
            >
              {formatDate(new Date(challenge.startDate), "dd/MM/yyyy")}
            </time>
            <span className="text-xs text-muted-foreground opacity-80">·</span>
            <time
              className="text-xs text-muted-foreground opacity-80"
              dateTime={challenge.endDate?.toISOString()}
            >
              {challenge.endDate &&
                formatDate(new Date(challenge.endDate), "dd/MM/yyyy")}
            </time>
          </div>
        </DialogHeader>
        <section>
          <p className="text-sm text-muted-foreground">
            {challenge.description}
          </p>

          {challenge.rewards && challenge.rewards.length > 0 && (
            <div className="py-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="rewards">
                  <AccordionTrigger>
                    <h3 className="text-base font-medium">Rewards</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="mt-1 space-y-1 list-disc pl-6">
                      {challenge.rewards.map((reward) => (
                        <li key={reward.id}>
                          <span className="text-sm font-medium">
                            {reward.name}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </section>

        {isJoined ? (
          <Button
            onClick={() => router.push(`/challenges/${challenge.id}`)}
            variant={"outline"}
          >
            Go to challenge
          </Button>
        ) : (
          <div className="flex flex-row">
            <ChallengeJoinButton
              challenge={challenge}
              userId={user.id}
              onJoin={joinChallenge}
            />
            <Button>
              <Link href={`/admin/challenges/${challenge.id}`}>
                View challenge
              </Link>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
