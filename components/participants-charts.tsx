"use client";

import { ProgressBar, SparkAreaChart } from "@tremor/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const MaxParticipantsChart = ({
  value,
  maxParticipants,
}: {
  value: number;
  maxParticipants: number;
}) => {
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
      <CardContent className="flex flex-col space-y-3">
        <h1 className="text-2xl">
          {value} / <b>{maxParticipants}</b>
        </h1>

        <ProgressBar value={value} color="blue" className="py-2" />
      </CardContent>
    </Card>
  );
};

export const ParticipantsChart = ({
  value,
  participantsPercentage,
}: {
  value: number;
  participantsPercentage: {
    date: string;
    participants: number;
  }[];
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Total Participants</CardTitle>
        <CardDescription>
          <span className="text-xs tracking-tighter text-muted-foreground">
            Total number of participants in the challenge.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl">{value}</h2>
        <SparkAreaChart
          index={"date"}
          className="w-full"
          categories={["participants"]}
          colors={["teal"]}
          data={participantsPercentage}
        />
      </CardContent>
    </Card>
  );
};
