import { Suspense } from "react";
import { AdminUsersCount } from "./users-count-card";

export default function AdminUsersInfoCards() {
  return (
    <div className="xl:col-span-1">
      <Suspense>
        <AdminUsersCount />
      </Suspense>
    </div>
  );
}
