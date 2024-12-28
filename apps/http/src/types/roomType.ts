import { z } from "zod";

export const CreateRoomSchema = z.object({
  name: z.string(),
  mapId: z.string(),
  description : z.string().optional(),
  maxUsers: z.number().optional()
});

export const DeleteRoomSchema = z.object({
    roomId: z.string()
});

export const GetRoomsByIdSchema = z.object({
    roomId: z.string()
});

export type CreateRoomData = z.infer<typeof CreateRoomSchema>;
export type DeleteRoomData = z.infer<typeof DeleteRoomSchema>;
export type GetRoomsByIdData = z.infer<typeof GetRoomsByIdSchema>;
