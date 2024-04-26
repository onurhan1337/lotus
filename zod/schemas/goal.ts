import { z } from "zod";

export const createGoalSchema = z.object({
  name: z.string(),
  description: z.string(),
});
