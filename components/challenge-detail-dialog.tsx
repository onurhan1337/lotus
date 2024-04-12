"use server";

import { getChallenge, joinChallenge } from "@/actions/challenge";
import { auth } from "@clerk/nextjs";
import { formatDate } from "date-fns";
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

export const ChallengeDetailDialog = async ({ id }: { id: string }) => {
  const challenge = await getChallenge(id);
  const { userId } = auth();

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

        <ChallengeJoinButton
          challenge={challenge}
          userId={userId}
          onJoin={joinChallenge}
        />
      </DialogContent>
    </Dialog>
  );
};
