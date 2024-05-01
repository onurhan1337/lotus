"use client";

import { getGoal } from "@/actions/goal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Suspense } from "react";
import useSWR from "swr";
import GoalEditForm from "./goal-edit-form";

interface GoalEditDialogProps {
  isDialogOpen: boolean;
  onClose: () => void;
  goalId: string;
}

export default function GoalEditDialogProps({
  isDialogOpen,
  onClose,
  goalId,
}: GoalEditDialogProps) {
  const { data: goal } = useSWR(goalId ? goalId : null, () => getGoal(goalId));

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose} aria-label="Edit Goal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Goal</DialogTitle>
          <DialogDescription>Update the goal details below.</DialogDescription>
        </DialogHeader>
        {goal && (
          <Suspense>
            <GoalEditForm goal={goal} onClose={onClose} />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  );
}
