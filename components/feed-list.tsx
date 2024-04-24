import { Feed } from "@prisma/client";
import { Inbox } from "lucide-react";
import { FeedCard } from "./feed-card";

interface FeedListProps {
  feeds: Feed[];
}

export const FeedsList = ({ feeds }: FeedListProps) => {
  return (
    <section className="mt-4 space-y-4">
      {feeds && feeds.length > 0 ? (
        feeds.map((feed) => <FeedCard feed={feed} key={feed.id} />)
      ) : (
        <EmptyFeedsList />
      )}
    </section>
  );
};

const EmptyFeedsList = () => {
  return (
    <div className="flex flex-col items-center justify-center border border-muted-foreground border-dashed rounded-lg p-4 space-y-4">
      <div className="flex flex-col items-center text-center">
        <Inbox className="size-6 text-muted-foreground" />
        <div className="text-sm font-medium">No feeds found</div>
        <div className="mt-2 text-xs text-muted-foreground">
          You can add a feed by clicking the <b>Add Feed</b> button.
        </div>
      </div>
    </div>
  );
};
