import {z} from "zod";

export const UpdateMetadataSchema = z.object({
    avatarId : z.string()
})

export const CreateSpaceSchema = z.object({
    name : z.string(),
    dimensions : z.string().regex(/^[0-9]{1,4}x[0-9]{1-4}$/),
    mapId : z.string().optional(),
    thumbnail : z.string().optional()
})

export const AddElementSchema = z.object({
    elementId : z.string(),
    spaceId : z.string(),
    x : z.number(),
    y : z.number()
})

export const CreateElementSchema = z.object({
    imageUrl : z.string(),
    width : z.number(),
    height : z.number(),
    static : z.boolean()
})

export const UpdateElementSchema = z.object({
    imageUrl : z.string()
})

export const DeleteElementSchema = z.object({
    id : z.string()
})


