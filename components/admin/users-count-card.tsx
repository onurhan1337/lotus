"use client";

import { useEffect, useState } from "react";
import { Users2 } from "lucide-react";

import { getUsersCount } from "@/actions/user";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const AdminUsersCount = () => {
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    async function fetchUsers() {
      const response = await getUsersCount();
      if (response.message !== "Not Authorized" && response.usersCount) {
        setUserCount(response.usersCount);
      }
    }

    fetchUsers();
  }, []);

  return (
    <Card className="h-min xl:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Users Count</CardTitle>
        <Users2 className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{userCount}</div>
        <p className="text-xs text-muted-foreground">
          Total number of users in the database
        </p>
      </CardContent>
    </Card>
  );
};
