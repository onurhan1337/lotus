"use client";

import React from "react";
import { AddDialog } from "./add-goal-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export interface AddGoalDialogProps {
  challengeId: string;
}

export const AddGoalDialog = ({ challengeId }: AddGoalDialogProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Add new Goal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Goal</DialogTitle>
          <DialogDescription>
            For now you can only add your goals with the only description. In
            the future I will add new goals with the metrics and the deadline.
          </DialogDescription>
        </DialogHeader>

        <AddDialog challengeId={challengeId} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
