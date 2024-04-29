import { GoalGroup, getAllGoals } from "@/actions/stats";
import { AreaChart } from "@tremor/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const ChallengeTotalGoalsChart = async ({
  challengeId,
}: {
  challengeId: string;
}) => {
  const goals: GoalGroup[] = (await getAllGoals(challengeId)) ?? [];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Max Participants</CardTitle>
        <CardDescription>
          <span className="text-xs tracking-tighter text-muted-foreground">
            Maximum number of participants allowed in the challenge.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart
          className="h-80"
          data={goals}
          index="date"
          categories={["Completed Goals", "Total Goals"]}
          colors={["indigo", "rose"]}
          yAxisWidth={60}
        />
      </CardContent>
    </Card>
  );
};
