import { checkRole } from "@/lib/roles";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { Feed } from "@prisma/client";
import { format } from "date-fns";
import { FeedCardActions } from "./feed-card-actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";

interface FeedCardProps {
  feed: Feed;
}

export const FeedCard = async ({ feed }: FeedCardProps) => {
  const user = await clerkClient.users.getUser(feed.userId);

  return (
    <Card key={feed.id} className="w-full max-w-xs shadow-sm">
      <CardHeader className="flex flex-row items-start justify-items-start gap-x-2">
        <Avatar>
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
        <FeedCardContent feed={feed} user={user} />
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{feed.text}</div>
      </CardContent>
    </Card>
  );
};

const FeedCardContent = async ({ feed, user }: { feed: Feed; user: User }) => {
  const isAdmin = await checkRole("admin");

  return (
    <>
      {isAdmin ? (
        <div className="flex flex-row items-start justify-between w-full">
          <div className="flex flex-col w-full gap-y-1">
            <h3 className="text-sm font-medium leading-none text-foreground">
              {user.username}
            </h3>
            <span className="text-xs leading-tight tracking-tighter text-muted-foreground">
              {format(feed.createdAt, "MMM d, yyyy hh:mm a")}
            </span>
          </div>
          <FeedCardActions id={feed.id} />
        </div>
      ) : (
        <div className="flex flex-row items-start justify-between w-full gap-y-1">
          <h3 className="text-sm font-medium leading-none text-foreground">
            {user.username}
          </h3>
          <span className="text-xs leading-tight tracking-tighter text-muted-foreground">
            {format(feed.createdAt, "MMM d, yyyy hh:mm a")}
          </span>
        </div>
      )}
    </>
  );
};
