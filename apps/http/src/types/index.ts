import {z} from "zod";

export const signUpBody = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    type: z.enum(["admin","user"])
})