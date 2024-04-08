"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AdminSearchUsers } from "./search-users";

interface AdminUserSearchCardProps {
  users: User[];
}

export default function AdminUserSearchCard({
  users,
}: AdminUserSearchCardProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          <AdminSearchUsers />
        </CardTitle>
        <CardDescription>
          This search scans usernames for the search term to find users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {users &&
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => handleUserClick(user)}
            />
          ))}
        {users.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No users found in the database.
          </p>
        )}
        {selectedUser && selectedUser.emailAddresses[0] && (
          <SelectedUserCard user={selectedUser} />
        )}
      </CardContent>
    </Card>
  );
}

function UserCard({ user, onClick }: { user: User; onClick: () => void }) {
  return (
    <div onClick={onClick} className="cursor-pointer rounded-md">
      <div className="flex items-center mb-2 space-x-2 relative">
        <div>
          <Image
            src={user.imageUrl}
            alt={`${user.firstName} ${user.lastName}'s profile picture`}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <div>
          <div className="text-sm font-semibold">{user.firstName}</div>
        </div>
      </div>
    </div>
  );
}

function SelectedUserCard({ user }: { user: User }) {
  return (
    <div className="prose lg:prose-xl mt-4 border-t border-gray-200 pt-4 space-y-4">
      <h2 className="text-lg font-semibold tracking-tighter">Selected User</h2>

      <motion.div
        key={user.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="flex flex-col items-start space-x-2"
      >
        <div className="flex flex-row space-x-2">
          <Image
            src={user.imageUrl}
            alt={user.firstName + " " + user.lastName}
            width={32}
            height={32}
            className="rounded-full h-8 w-8"
          />
          <div>
            <div className="text-sm font-semibold">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-muted-foreground">{user.username}</div>
          </div>
        </div>
        <ul className="space-y-0.5 my-2">
          <li className="text-xs text-muted-foreground">
            &gt; Emails: {user.emailAddresses[0].emailAddress}
          </li>
          <li className="text-xs text-muted-foreground">
            <span className="text-xs text-muted-foreground">
              &gt; Last signed in:{" "}
              {user.lastSignInAt
                ? new Date(user.lastSignInAt).toLocaleDateString()
                : "N/A"}
            </span>
            &gt; Created Date: {new Date(user.createdAt).toLocaleDateString()}
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
