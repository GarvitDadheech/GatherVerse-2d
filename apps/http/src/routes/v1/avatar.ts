import { Router } from "express";
import client from "@repo/db";
import { getAvatarsController } from "../../controller/avatarController";

export const avatarRouter = Router();

avatarRouter.get("/all",getAvatarsController);