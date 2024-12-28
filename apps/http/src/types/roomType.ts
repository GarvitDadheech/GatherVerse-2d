import { z } from "zod";

export const CreateRoomSchema = z.object({
  name: z.string(),
  mapId: z.string(),
  description: z.string().optional(),
  maxUsers: z.number().optional(),
});

export type CreateRoomData = z.infer<typeof CreateRoomSchema>;
