import { Router } from "express";
import client from "@repo/db";

export const elementRouter = Router();

elementRouter.get("/all",async (req,res) => {
    try {
        const elements = await client.element.findMany()

        res.json({elements: elements.map(element => ({
            id: element.id,
            imageUrl: element.imageUrl,
            width: element.width,
            height: element.height,
            static: element.static
        }))})
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }
})