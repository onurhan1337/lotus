"use client";

import { deleteFeed } from "@/actions/feed";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface FeedCardActionsProps {
  id: string;
}

export const FeedCardActions = ({ id }: FeedCardActionsProps) => {
  const onDeleteFeed = async () => {
    try {
      await deleteFeed(id);

      toast.success("Feed deleted successfully");
      return;
    } catch (error) {
      toast.error("Failed to delete feed");
      console.error("Error deleting feed:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="size-4 text-muted-foreground" />
        <span className="sr-only">Admin Actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onDeleteFeed}>Delete Feed</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
