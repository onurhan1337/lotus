"use client";

import { Goal } from "@prisma/client";
import { Inbox } from "lucide-react";
import React from "react";
import { GoalCard } from "./goal-card";
import { ShareGoalsDialog } from "./share-goals-dialog";
import { ShareableGoalCard } from "./shareable-goal-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export const MyGoals = ({ goals }: { goals: Goal[] }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <CardTitle>My Goals</CardTitle>
            <CardDescription>Follow the progress of your goals</CardDescription>
          </div>
          {goals && goals.length > 0 && (
            <ShareGoalsDialog>
              {goals.map((goal, index) => (
                <div key={goal.id}>
                  <ShareableGoalCard goal={goal} />
                  {index !== goals.length - 1 && (
                    <span
                      className={
                        "text-xs block text-muted-foreground text-center "
                      }
                    >
                      ···
                    </span>
                  )}
                </div>
              ))}
            </ShareGoalsDialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ScrollArea className="h-full px-4">
          {goals && goals.length > 0 ? (
            goals.map((goal, index) => (
              <React.Fragment key={goal.id}>
                <GoalCard goal={goal} />
                {index !== goals.length - 1 && (
                  <span
                    className={
                      "text-xs block text-muted-foreground text-center "
                    }
                  >
                    ···
                  </span>
                )}
              </React.Fragment>
            ))
          ) : (
            <EmptyMyGoals />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const EmptyMyGoals = () => {
  return (
    <div className="flex flex-col items-center justify-center border border-muted-foreground border-dashed rounded-lg p-4 space-y-4 opacity-60">
      <div className="flex flex-col items-center text-center">
        <Inbox className="size-6 text-muted-foreground" />
        <div className="text-sm font-medium">No goals found</div>
        <div className="mt-2 text-xs text-muted-foreground">
          You can add a goal by clicking the <b>Add Goal</b> button.
        </div>
      </div>
    </div>
  );
};
