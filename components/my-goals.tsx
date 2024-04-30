import { getGoals } from "@/actions/goal";
import { Inbox } from "lucide-react";
import React from "react";
import { GoalCard } from "./goal-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export const MyGoals = async ({
  userId,
  challengeId,
}: {
  userId: string;
  challengeId: string;
}) => {
  const { data: goals } = await getGoals(userId, challengeId);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>My Goals</CardTitle>
        <CardDescription>Follow the progress of your goals</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ScrollArea className="h-full">
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
