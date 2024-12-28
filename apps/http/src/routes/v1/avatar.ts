import { Router } from "express";
import {
  getAvatarByIdController,
  getAvatarsController,
} from "../../controller/avatarController";

export const avatarRouter = Router();

avatarRouter.get("/all", getAvatarsController);
avatarRouter.get("/:avatarId", getAvatarByIdController);
