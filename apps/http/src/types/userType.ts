import z from "zod";

export const OnboardUserSchema = z.object({
  username: z.string(),
  age: z.number(),
  gender: z.enum(["Male", "Female"]),
  avatarId: z.string(),
});

export const UpdateMetadataSchema = z.object({
  userId: z.string(),
  avatarId: z.string(),
});

export const GetMetadataBulkSchema = z.object({
  userIds: z.array(z.string().cuid()),
});

export type OnboardUserData = z.infer<typeof OnboardUserSchema>;
export type UpdateMetadataData = z.infer<typeof UpdateMetadataSchema>;
export type GetMetadataBulkData = z.infer<typeof GetMetadataBulkSchema>;
