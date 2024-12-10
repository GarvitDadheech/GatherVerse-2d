import { Router } from "express";
import { CreateElementSchema, UpdateElementSchema } from "../../types";
import { AdminMiddleware } from "../../middleware/admin";
import client from "@repo/db";
import { ParseStatus } from "zod";

export const adminRouter = Router();

adminRouter.use(AdminMiddleware);

adminRouter.post("/element", async (req,res) => {
    
})

adminRouter.post("/avatar",(req,res) => {
    
})

adminRouter.post("/map",(req,res) => {
    
})
