import type { Metadata } from "next";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Challenges you have attempted and your progress.",
};

export default function Home() {
  return (
    <Container title="Dashboard">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no challenges
        </h3>
        <p className="text-sm text-muted-foreground">
          You can attempt challenges to challenge yourself.
        </p>
        <Button className="mt-4">Start a challenge</Button>
      </div>
    </Container>
  );
}
