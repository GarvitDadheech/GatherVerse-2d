import { z } from "zod";

export const CreateMapSchema = z.object({
  name: z.string(),
  thumbnail: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1-4}$/),
  defaultElements: z.array(
    z.object({
      elementId: z.string(),
      x: z.number(),
      y: z.number(),
    })
  ),
});

export type CreateMapData = z.infer<typeof CreateMapSchema>;
