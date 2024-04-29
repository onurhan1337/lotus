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

export const MyGoals = async ({ userId }: { userId: string }) => {
  const { data: goals } = await getGoals(userId);

  return (
    <Card className="min-h-[365px] max-h-[365px]">
      <CardHeader>
        <CardTitle>My Goals</CardTitle>
        <CardDescription>Follow the progress of your goals</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[365px] max-h-[365px]">
        <ScrollArea className="h-[230px]">
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
            <div
              className={
                "flex flex-col items-center space-y-2 border border-dashed border-muted-foreground p-4 rounded opacity-60"
              }
            >
              <Inbox className="h-6 w-6 text-muted-foreground" />
              <p className={"text-sm text-muted-foreground"}>No goals yet</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
