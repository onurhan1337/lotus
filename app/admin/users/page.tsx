import type { Metadata } from "next";
import { clerkClient } from "@clerk/nextjs";

import Container from "@/components/layout/container";
import AdminUserSearchCard from "@/components/admin/user-search-card";
import AdminUsersInfoCards from "@/components/admin/users-info-cards";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin - Users",
};

export default async function AdminUsersPage(params: {
  searchParams: { search?: string };
}) {
  const query = params.searchParams.search;

  const users = query ? await clerkClient.users.getUserList({ query }) : [];

  return (
    <Container title="Users">
      <section className="space-y-4">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Suspense>
            <AdminUserSearchCard users={JSON.parse(JSON.stringify(users))} />
            <AdminUsersInfoCards />
          </Suspense>
        </div>
      </section>
    </Container>
  );
}
