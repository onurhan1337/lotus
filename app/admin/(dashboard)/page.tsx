import { redirect } from "next/navigation";

import { checkRole } from "@/lib/roles";
import Container from "@/components/layout/container";

export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  return (
    <Container title="admin">
      <div>
        <h1>This is the admin dashboard</h1>
        <p>This page is restricted to users with the admin role.</p>
      </div>
    </Container>
  );
}
