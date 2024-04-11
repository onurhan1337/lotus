import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {ChallengesList} from "@/components/challenges-list";

export const metadata: Metadata = {
    title: "Challenges",
    description: "List of all challenges",
};

export default function ChallengesPage() {
    return (
        <Container title="Challenges">
            <ChallengesList />
        </Container>
    );
}
