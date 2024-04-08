import type { Metadata } from "next";
import AdminChallengesTable from "@/components/admin/challenges-table";
import Container from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Admin - Challenges",
};

export default function AdminChallengesPage() {
  return (
    <Container title="Challenges">
      <section className="space-y-4">
        <AdminChallengesTable />
      </section>
    </Container>
  );
}
