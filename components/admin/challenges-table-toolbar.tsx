"use client";

import { removeChallenge } from "@/actions/challenge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

interface AdminChallengesTableToolbarProps {
  id: string;
}

export default function AdminChallengesTableToolbar({
  id,
}: AdminChallengesTableToolbarProps) {
  const onRemove = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this challenge?"
    );
    if (confirmDelete) {
      try {
        await removeChallenge(id);
        toast.success("Challenge removed successfully");
      } catch (error) {
        toast.error("Failed to remove challenge");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRemove(id)}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
