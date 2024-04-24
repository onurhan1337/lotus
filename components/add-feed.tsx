"use client";

import { createFeed } from "@/actions/feed";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createFeedSchema } from "@/zod/schemas/feed";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CornerDownLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Card } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";

export const AddFeed = ({ feedChallengeId }: { feedChallengeId: string }) => {
  const { user } = useUser();

  const form = useForm<z.infer<typeof createFeedSchema>>({
    resolver: zodResolver(createFeedSchema),
    defaultValues: {
      text: "",
    },
  });

  if (!user) return null;

  const onCreateFeed = async (values: z.infer<typeof createFeedSchema>) => {
    try {
      const res = await createFeed(
        values,
        user.id as string,
        feedChallengeId as string
      );

      if (!res) throw new Error("Failed to create feed");

      toast.success("Feed created successfully");
      return res;
    } catch (error) {
      toast.error("Failed to create feed");
      console.error("Error creating feed:", error);
    }
  };

  return (
    <Card className="w-full mt-auto p-3 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCreateFeed)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="text" className="sr-only">
                  Text
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="resize-none border-0 shadow-none focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" className="flex ml-auto gap-1.5">
            Add Feed
            <CornerDownLeft className="size-3.5" />
          </Button>
        </form>
      </Form>
    </Card>
  );
};
