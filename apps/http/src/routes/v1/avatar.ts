import { Router } from "express";
import { getAvatarsController } from "../../controller/avatarController";

export const avatarRouter = Router();

avatarRouter.get("/all",getAvatarsController);