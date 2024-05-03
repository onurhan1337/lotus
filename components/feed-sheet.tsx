import { getAllFeeds } from "@/actions/feed";
import { Suspense, cache } from "react";
import { AddFeed } from "./add-feed";
import { FeedsList } from "./feed-list";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export interface FeedsSheetProps {
  feedChallengeId: string;
}

const loadFeeds = cache(async (feedChallengeId: string) => {
  const feeds = await getAllFeeds(feedChallengeId);
  return feeds;
});

export const FeedsSheet = async ({ feedChallengeId }: FeedsSheetProps) => {
  const feeds = await loadFeeds(feedChallengeId);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          Feed
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Challenge Feeds</SheetTitle>
          <SheetDescription>
            Challenge feeds are a list of all the goals and tasks that have been
            completed for this challenge.
          </SheetDescription>
        </SheetHeader>

        <Suspense fallback={<div>Loading feeds...</div>}>
          <ScrollArea className="flex-grow">
            <FeedsList feeds={feeds} />
          </ScrollArea>
        </Suspense>

        <AddFeed feedChallengeId={feedChallengeId} />
      </SheetContent>
    </Sheet>
  );
};
