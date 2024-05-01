"use client";

import { deleteGoal } from "@/actions/goal";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { toast } from "sonner";
import GoalEditDialogProps from "./goal-edit-dialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const GoalCardActions = ({ goalId }: { goalId: string }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] =
    React.useState<boolean>(false);

  const handleDeleteGoal = async (goalId: string) => {
    try {
      const res = await deleteGoal(goalId);

      if (!res) throw new Error("Failed to delete goal");

      toast.success("Goal deleted successfully");
    } catch (error) {
      toast.error("Failed to delete goal");
      console.error("Error deleting goal:", error);
      throw error;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1">
            <DotsHorizontalIcon className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteGoal(goalId)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <GoalEditDialogProps
        isDialogOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        goalId={goalId}
      />
    </>
  );
};
