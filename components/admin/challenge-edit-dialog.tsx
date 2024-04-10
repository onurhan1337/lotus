"use client";

import { getChallenge } from "@/actions/challenge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSWR from "swr";
import AdminChallengeEditForm from "./challenge-edit-form";

interface AdminChallengeEditDialogProps {
  isDialogOpen: boolean;
  onClose: () => void;
  challengeId: string;
}

export default function AdminChallengeEditDialog({
  isDialogOpen,
  onClose,
  challengeId,
}: AdminChallengeEditDialogProps) {
  const { data: challenge, error } = useSWR(
    challengeId ? challengeId : null,
    () => getChallenge(challengeId)
  );

  if (error) return <div>Failed to load challenge</div>;
  if (!challenge) return <div>Loading...</div>;

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={onClose}
      aria-label="Edit Challenge"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Challenge</DialogTitle>
          <DialogDescription>
            Update the challenge details below.
          </DialogDescription>
        </DialogHeader>
        {challenge && (
          <AdminChallengeEditForm challenge={challenge} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
