import { z } from "zod";

export const createFeedSchema = z.object({
  text: z.string(),
});
