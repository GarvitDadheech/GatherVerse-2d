import { Router } from "express";
import client from "@repo/db";

export const avatarRouter = Router();

avatarRouter.get("/all",async (req,res) => {
    try {
        const avatars = await client.avatar.findMany();
        res.json({avatars : avatars.map(avatar => ({
                    id: avatar.id,
                    imageUrl: avatar.imageUrl,
                    name: avatar.name
                })
            )
        })
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }
})