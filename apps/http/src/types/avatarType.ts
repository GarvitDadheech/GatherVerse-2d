import {z} from "zod";

export const CreateAvatarSchema = z.object({
    imageUrl : z.string(),
    name : z.string(),
    gender : z.enum(["Male","Female"])
})

export type CreateAvatarData = z.infer<typeof CreateAvatarSchema>;