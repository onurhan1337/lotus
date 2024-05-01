"use client";

import { updateGoalStatus } from "@/actions/goal";
import { cn } from "@/lib/utils";
import { Goal } from "@prisma/client";
import React from "react";
import { toast } from "sonner";
import { GoalCardActions } from "./goal-card-actions";
import { Checkbox } from "./ui/checkbox";

interface GoalCardProps {
  goal: Goal;
}

export const GoalCard = ({ goal }: GoalCardProps) => {
  const [isPending, startTransition] = React.useTransition();

  const handleCompleteGoal = async (goal: Goal): Promise<void> => {
    try {
      const res = await updateGoalStatus(goal.id, goal.userId);

      if (!res) throw new Error("Failed to update goal");

      toast.success("Goal updated successfully");
    } catch (error) {
      toast.error("Failed to update goal");
      console.error("Error updating goal:", error);
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1 flex items-center justify-start space-x-4 -space-y-1">
        <Checkbox
          checked={goal.isCompleted}
          onCheckedChange={() =>
            startTransition(() => handleCompleteGoal(goal))
          }
          disabled={isPending}
        />
        <article className={"flex flex-col"}>
          <h2
            className={cn(
              goal.isCompleted ? "line-through" : "",
              "text-sm leading-6 font-medium tracking-tight"
            )}
          >
            {goal.name}
          </h2>
          <p
            className={cn(
              goal.isCompleted ? "line-through" : "",
              "text-sm tracking-tighter text-balance text-muted-foreground"
            )}
          >
            {goal.description}
          </p>
        </article>
      </div>
      <GoalCardActions goalId={goal.id} />
    </div>
  );
};
