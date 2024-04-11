import { z } from "zod";

export const createChallengeSchema = z
  .object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    maxParticipants: z.coerce
      .number().optional(),
    registrationDeadline: z.date(),
    dateRange: z.object(
      {
        from: z.date(),
        to: z.date(),
      },
      {
        required_error: "Date Range is required",
      }
    ),
    isActive: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"], {
      required_error: "Is Active is required",
    }),
    rewards: z.array(
      z.object({
        name: z.string({
          required_error: "Reward Name is required",
        }),
      })
    ),
  })
  .refine(
    (data) => {
      if (
        data.registrationDeadline >= data.dateRange.from &&
        data.registrationDeadline <= data.dateRange.to
      ) {
        return true;
      }
      return false;
    },
    {
      message: "Registration deadline must be within the start/end date range",
      path: ["registrationDeadline"],
    }
  );
