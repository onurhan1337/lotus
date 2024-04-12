"use client";

import { Challenge, ChallengeParticipant, Reward } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface ChallengeJoinButtonProps {
  challenge: Challenge & {
    participants: ChallengeParticipant[];
    rewards: Reward[];
  };
  userId: string | null;
  onJoin: (challengeId: string, participantId: string) => void;
}

export const ChallengeJoinButton = ({
  challenge,
  userId,
  onJoin,
}: ChallengeJoinButtonProps) => {
  const disabled =
    (challenge.maxParticipants &&
      challenge.participants.length >= challenge.maxParticipants) ||
    challenge.participants.some((p) => p.userId === userId) ||
    challenge.isActive === "INACTIVE" ||
    challenge.isActive === "COMPLETED" ||
    (challenge.endDate && new Date(challenge.endDate) < new Date());

  const handleJoin = async () => {
    try {
      if (userId) {
        await onJoin(challenge.id, userId);

        toast.success("Challenge joined", {
          description: `You have joined the challenge ${challenge.name}`,
        });
      } else {
        toast.error("Error joining challenge", {
          description: "You must be logged in to join the challenge",
        });
      }
    } catch (error: any) {
      toast.error("Error joining challenge", {
        description: error.message,
      });
    }
  };

  return (
    <Button onClick={handleJoin} className="w-full" disabled={disabled}>
      {challenge.maxParticipants ? (
        <span className="flex items-center space-x-1 text-sm font-medium">
          Join -
          <span className="pl-2 text-xs text-muted-foreground">
            {challenge.participants.length}/{challenge.maxParticipants}{" "}
            participants
          </span>
        </span>
      ) : (
        <span className="flex items-center space-x-1 text-sm font-medium">
          Join -
          <span className="pl-2 text-xs text-muted-foreground">
            {challenge.participants.length} participants
          </span>
        </span>
      )}
    </Button>
  );
};
