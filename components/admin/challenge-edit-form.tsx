"use client";

import { editChallenge } from "@/actions/challenge";
import useMediaQuery from "@/lib/use-media-query";
import { cn } from "@/lib/utils";
import { createChallengeSchema } from "@/zod/schemas/login";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Challenge, ChallengeStatus } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { DatePicker } from "../ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AdminChallengeEditFormProps {
  challenge: Challenge & {
    rewards: { name: string }[];
  };
  onClose: () => void;
}

export default function AdminChallengeEditForm({
  challenge,
  onClose,
}: AdminChallengeEditFormProps) {
  const { isMobile } = useMediaQuery();
  const { user } = useUser();

  const form = useForm<z.infer<typeof createChallengeSchema>>({
    resolver: zodResolver(createChallengeSchema),
    defaultValues: {
      name: challenge.name,
      description: challenge.description,
      maxParticipants: challenge.maxParticipants,
      registrationDeadline: challenge.registrationDeadline || new Date(),
      dateRange: {
        from: challenge.startDate,
        to: challenge.endDate,
      },
      isActive: ChallengeStatus[challenge.isActive],
      rewards: challenge.rewards.map((reward) => ({
        name: reward.name,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rewards",
  });

  const onSubmit = async (
    values: z.infer<typeof createChallengeSchema>,
    challengeId: string
  ) => {
    try {
      if (user && user.publicMetadata?.role === "admin") {
        const challenge = await editChallenge(challengeId, values);

        if (challenge) {
          onClose();
          form.reset();
          toast.success("Challenge updated", {
            description: `${values.name} has been updated`,
          });
        }
      }

      return null;
    } catch (error: any) {
      toast.error("Error creating challenge", {
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, challenge.id))}
        className="grid gap-4 grid-cols-2 md:auto-rows-min md:gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Participants</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormItem>
            <DatePicker
              control={form.control}
              name="registrationDeadline"
              label="Registration Deadline"
              description="The date registration closes"
            />

            <FormMessage />
          </FormItem>
        </div>
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Challenge Status</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Challenge Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start and End Date</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value.from}
                      selected={{
                        from: field.value.from!,
                        to: field.value.to,
                      }}
                      onSelect={field.onChange}
                      numberOfMonths={isMobile ? 1 : 2}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the start and end date for the challenge
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2">
          <div className="flex items-center justify-between gap-4">
            <FormLabel>Rewards</FormLabel>
            <Button
              size={"sm"}
              variant={"outline"}
              type="button"
              onClick={() => {
                append({ name: "" });
                form.trigger();
              }}
            >
              Add Reward
            </Button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="col-span-2 flex items-center justify-between gap-4 my-2"
            >
              <Controller
                control={form.control}
                defaultValue={field.name}
                name={`rewards.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Input {...field} />
                  </FormItem>
                )}
              />

              <Button
                size={"sm"}
                variant={"secondary"}
                type="button"
                onClick={() => remove(index)}
              >
                X
              </Button>
            </div>
          ))}
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
            Edit Challenge
          </Button>
        </div>
      </form>
    </Form>
  );
}
