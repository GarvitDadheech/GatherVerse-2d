import { Router } from "express";
import { SignInSchema, SignUpSchema, UpdateMetadataSchema } from "../../types";
import client from "@repo/db";
import {hash,compare} from "../../scrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";
import { UserMiddleware } from "../../middleware/user";

export const userRouter = Router();

userRouter.post("/signup", async (req,res) => {
    const parsedData = SignUpSchema.safeParse(req.body);
    
    if(!parsedData.success) {
        res.status(403).json({
            message : "Invalid Data Recieved",
            errors : parsedData.error.issues
        })
        return
    }

    try {
        const hashedPassword = await hash(parsedData.data.password);

        const user = await client.user.create({
            data : {
                username : parsedData.data.username,
                password : hashedPassword,
                role : parsedData.data.type === "admin" ? "Admin" : "User"
            }
        })

        res.json({
            userId : user.id
        })
    }
    catch(e) {
        res.status(400).json({message : "User Already Exists"})
    }

})

userRouter.post("signin",async (req,res) => {
    const parsedData = SignInSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.status(403).json({
            message : "Invalid Data Recieved",
            errors : parsedData.error.issues
        })
        return
    }

    try {
        const user = await client.user.findUnique({
            where: {
                username: parsedData.data.username
            }
        })

        if(!user) {
            res.status(403).json({
                message : "User doesn't Exists!"
            })
            return
        }

        const isValid = await compare(parsedData.data.password,user.password);

        if(!isValid) {
            res.status(403).json({
                message: "Wrong credentials!"
            })
            return
        }

        const token = jwt.sign({
            userId : user.id,
            role : user.role
        },JWT_SECRET)

        res.json({
            token
        })

    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }   

})

userRouter.post("/metadata", UserMiddleware,async (req,res) => {
    const parsedData = UpdateMetadataSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.status(403).json({
            message : "Invalid Data Recieved",
            errors : parsedData.error.issues
        })
        return
    }

    try {
        const user = await client.user.update({
            where : {
                id : req.userId
            },
            data :{
                avatarId : parsedData.data.avatarId
            }
        })

        res.json({message : "Metadata Updated!"})
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }
})

userRouter.get("/metadata/bulk",async (req,res) => {
    const userIdString = req.query.userIds as string;
    const userIds = (userIdString).slice(1, userIdString?.length - 1).split(",");

    try {
        const metadata = await client.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            }, select: {
                avatar: true,
                id: true
            }
        })

        res.json({
            avatars: metadata.map(m => ({
                userId: m.id,
                avatarId: m.avatar?.imageUrl
            }))
        })
    }
    catch(e) {
        res.status(400).json({
            message : "Internal Server Error!"
        })
    }

})