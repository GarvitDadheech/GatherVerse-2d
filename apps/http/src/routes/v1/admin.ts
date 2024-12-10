import { Router } from "express";
import { CreateAvatarSchema, CreateElementSchema, CreateMapSchema, UpdateElementSchema } from "../../types";
import { AdminMiddleware } from "../../middleware/admin";
import client from "@repo/db";

export const adminRouter = Router();

adminRouter.use(AdminMiddleware);

adminRouter.post("/element", async (req,res) => {
    const parsedData = CreateElementSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid Data Recieved!"
        })
        return;
    }

    try {
        const element = await client.element.create({
            data: {
                imageUrl : parsedData.data.imageUrl,
                width : parsedData.data.width,
                height : parsedData.data.height,
                static : parsedData.data.static
            }
        })

        res.json({
            elementId : element.id
        })

    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }
})

adminRouter.put("/element/:elementId",async (req,res) => {
    const parsedData = UpdateElementSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid Data Recieved!"
        })
        return;
    }

    try {
        const element = await client.element.update({
            where: {
                id : req.params.elementId
            },
            data: {
                imageUrl : parsedData.data.imageUrl,
            }
        })

        res.json({
            message: "Element Updated!"
        })

    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }

    
})

adminRouter.post("/avatar",async (req,res) => {
    const parsedData = CreateAvatarSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid Data Recieved!"
        })
        return;
    }

    try {
        const avatar = await client.avatar.create({
            data: {
                imageUrl : parsedData.data.imageUrl,
                name : parsedData.data.name
            }
        })

        res.json({
            avatarId : avatar.id
        })
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }
    
})

adminRouter.post("/map",async (req,res) => {
    const parsedData = CreateMapSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid Data Recieved!"
        })
        return;
    }

    try {
        const map = await client.map.create({
            data: {
                name : parsedData.data.name,
                thumbnail : parsedData.data.thumbnail,
                width : Number(parsedData.data.dimensions.split("x")[1]),
                height : Number(parsedData.data.dimensions.split("x")[0]),
                mapElements : {
                    create : parsedData.data.defaultElements.map(element => ({
                        elementId : element.elementId,
                        x : element.x,
                        y : element.y
                    }))
                }
            }
        })

        res.json({
            mapId : map.id
        })
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }
})