"use client";

import { createGoal } from "@/actions/goal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createGoalSchema } from "@/zod/schemas/goal";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CornerDownLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

export const AddDialog = ({
  challengeId,
  onClose,
}: {
  challengeId: string;
  onClose: () => void;
}) => {
  const { user } = useUser();

  const form = useForm<z.infer<typeof createGoalSchema>>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  if (!user) return null;

  const onCreateGoal = async (values: z.infer<typeof createGoalSchema>) => {
    try {
      const res = await createGoal(
        values,
        user.id as string,
        challengeId as string
      );

      if (!res) throw new Error("Failed to create goal");

      toast.success("Goal created successfully");
      return res;
    } catch (error) {
      toast.error("Failed to create goal");
      console.error("Error creating goal:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCreateGoal)} className="space-y-4">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Read a book" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="I want to read 10 pages of a book every day."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size="sm" className="flex ml-auto gap-1.5">
            Add Goal
            <CornerDownLeft className="size-3.5" />
          </Button>
        </form>
      </Form>
    </div>
  );
};
