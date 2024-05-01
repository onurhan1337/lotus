"use client";

import { editGoal } from "@/actions/goal";
import { createGoalSchema } from "@/zod/schemas/goal";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Goal } from "@prisma/client";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface GoalEditFormProps {
  goal: Goal;
  onClose: () => void;
}

export default function GoalEditForm({ goal, onClose }: GoalEditFormProps) {
  const { user } = useUser();

  const form = useForm<z.infer<typeof createGoalSchema>>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: goal.name,
      description: goal.description,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof createGoalSchema>,
    goalId: string
  ) => {
    try {
      if (user && user.publicMetadata?.role === "admin") {
        const goal = await editGoal(goalId, values);

        if (goal) {
          onClose();
          form.reset();
          toast.success("Goal updated", {
            description: `${values.name} has been updated`,
          });
        }
      }

      return null;
    } catch (error: any) {
      toast.error("Error updating goal", {
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, goal.id))}
        className="space-y-4"
      >
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

        <div className="flex justify-end w-full col-span-2">
          <Button
            type="submit"
            size="sm"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Edit Goal
          </Button>
        </div>
      </form>
    </Form>
  );
}
