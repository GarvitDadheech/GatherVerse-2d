import { Router } from "express";
import { AddElementSchema, CreateSpaceSchema, DeleteElementSchema } from "../../types";
import client from "@repo/db";
import { UserMiddleware } from "../../middleware/user";
export const spaceRouter = Router();

spaceRouter.post("/", UserMiddleware ,async (req,res) => {
    const parsedData = CreateSpaceSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid Data Recieved!"
        })
        return
    }

    
    if(!parsedData.data.mapId) {
        
        let space;
        
        if(parsedData.data.thumbnail) {
            space = await client.space.create({
                data : {
                    name: parsedData.data.name,
                    width : Number(parsedData.data.dimensions.split("x")[1]),
                    height : Number(parsedData.data.dimensions.split("x")[0]),
                    thumbnail : parsedData.data.thumbnail,
                    creatorId : req.userId!
                }
            })
        } 
        else {
            space = await client.space.create({
                data : {
                    name: parsedData.data.name,
                    width : Number(parsedData.data.dimensions.split("x")[1]),
                    height : Number(parsedData.data.dimensions.split("x")[0]),
                    creatorId : req.userId!
                }
            })

            res.json({
                spaceId : space.id
            })
        }
    }
    else  {
        const map = await client.map.findUnique({
            where : {
                id : parsedData.data.mapId
            },
            select : {
                mapElements : true,
                width : true,
                height : true
            }
        })

        if(!map) {
            res.status(400).json({
                message : "Invalid Map Id!"
            })
            return;
        }

        const space = await client.$transaction(async () => {

            const space = await client.space.create({
                data : {
                    name: parsedData.data.name,
                    width : map.width,
                    height : map.height,
                    creatorId : req.userId!
                }
            })

            await client.spaceElements.createMany({
                data : map.mapElements.map(element => ({
                    spaceId: space.id,
                    elementId : element.elementId,
                    x : element.x!,
                    y : element.y!,
                }))
            })

            return space 
        }
    )
        res.json({
            spaceId : space.id
        })
    }
})

spaceRouter.delete("/:spaceId",UserMiddleware,async (req,res) => {

    if(!req.params.spaceId) {
        res.status(400).json({
            message : "Invalid Space Id!"
        })
        return;
    }

    try {

        const space = await client.space.findUnique({
            where : {
                id : req.params.spaceId
            }
        })

        if(!space) {
            res.status(400).json({
                message : "Invalid Space Id!"
            })
            return;
        }

        if(space.creatorId !== req.userId) {
            res.status(401).json({
                message : "Unauthorized!"
            })
            return;
        }

        await client.space.delete({
            where : {
                id : req.params.spaceId
            }
        })
        res.json({
            message : "Space Deleted!"
        })
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }
})

spaceRouter.get("/all",UserMiddleware,async (req,res) => {
    try {
        const spaces = await client.space.findMany({
            where : {
                creatorId : req.userId
            }
        })

        res.json({
            spaces: spaces.map(space => ({
                id : space.id,
                name : space.name,
                dimensions : `${space.height}x${space.width}`,
                thumbnail : space.thumbnail
            }))
        })
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }

})

spaceRouter.get("/:spaceId",UserMiddleware,async (req,res) => {

    if(!req.params.spaceId) {
        res.status(400).json({
            message : "Invalid Space Id!"
        })
        return;
    }

    try {
        const space = await client.space.findUnique({
            where : {
                id : req.params.spaceId
            },
            include : {
                spaceElements : {
                    include : {
                        element : true
                    }
                }
            }
        })

        if(!space) {
            res.status(400).json({
                message : "Invalid Space Id!"
            })
            return;
        }

        if(space.creatorId !== req.userId) {
            res.status(401).json({
                message : "Unauthorized!"
            })
            return;
        }

        res.json({
            dimensions : `${space.height}x${space.width}`,
            elements : space.spaceElements.map(e => ({
                id : e.id,
                element: {
                    id : e.element.id,
                    imageUrl : e.element.imageUrl,
                    width : e.element.width,
                    height : e.element.height,
                    static : e.element.static
                },
                x : e.x,
                y : e.y
            }))
        })
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }

})

spaceRouter.post("/element",UserMiddleware,async (req,res) => {
    const parsedData = AddElementSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid Data Recieved!"
        })
        return;
    }

    try {
        const space = await client.space.findUnique({
            where : {
                id : parsedData.data.spaceId
            }
        })

        if(!space) {
            res.status(400).json({
                message : "Invalid Space Id!"
            })
            return;
        }

        if(space.creatorId !== req.userId) {
            res.status(401).json({
                message : "Unauthorized!"
            })
            return;
        }

        const element = client.element.findUnique({
            where : {
                id : parsedData.data.elementId
            }
        })

        if(!element) {
            res.status(400).json({
                message : "Invalid Element Id!"
            })
            return;
        }

        await client.spaceElements.create({
            data : {
                spaceId : parsedData.data.spaceId,
                elementId : parsedData.data.elementId,
                x : parsedData.data.x,
                y : parsedData.data.y
            }
        })

        res.json({
            message : "Element Added!"
        })
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }

})

spaceRouter.delete("/element",async (req,res) => {

    const parsedData = DeleteElementSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid Data Recieved!"
        })
        return;
    }

    try{
        const spaceElement = await client.spaceElements.findUnique({
            where : {
                id : parsedData.data.id
            },
            include : {
                space : true
            }
        })

        if(!spaceElement) {
            res.status(400).json({
                message : "Invalid Element Id!"
            })
            return;
        }

        if(spaceElement.space.creatorId !== req.userId) {
            res.status(401).json({
                message : "Unauthorized!"
            })
            return;
        }

        await client.spaceElements.delete({
            where : {
                id : parsedData.data.id
            }
        })

        res.json({
            message : "Element Deleted!"
        })
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }


})
