import { CreateAvatarSchema } from "../types/avatarType";
import { Request, Response } from "express";
import { avatarService } from "../service/avatarService";
import Logger from "@repo/logger";

export const createAvatarController = async (req: Request, res: Response) => {
  Logger.info("Inside createAvatarController", { body: req.body });
  const parsedData = CreateAvatarSchema.safeParse(req.body);

  if (!parsedData.success) {
    Logger.warn("Invalid avatar creation data", {
      errors: parsedData.error.errors,
    });
    res.status(400).json({
      message: "Invalid Data Recieved!",
    });
    return;
  }

  try {
    const avatar = await avatarService.createAvatar(parsedData.data);
    Logger.info("Avatar created successfully", { avatarId: avatar.id });

    res.json({
      avatarId: avatar.id,
    });
  } catch (e) {
    Logger.error("Failed to create avatar", {
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(400).json({
      message: "Internal Server Error!",
    });
  }
};

export const getAvatarsController = async (req: Request, res: Response) => {
  Logger.info("Inside getAvatarsController");
  try {
    const avatars = await avatarService.getAvatars();
    Logger.info("Avatars retrieved successfully", { count: avatars.length });
    res.json({ avatars });
  } catch (e) {
    Logger.error("Failed to fetch avatars", {
      error: e instanceof Error ? e.message : "Unknown error",
    });
    throw new Error("Failed to fetch avatars");
  }
};

export const getAvatarByIdController = async (req: Request, res: Response) => {
  Logger.info("Inside getAvatarByIdController", { avatarId: req.params.id });
  const avatarId = req.params.id;
  if (!avatarId) {
    Logger.warn("Avatar ID missing in request");
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }

  try {
    const avatar = await avatarService.getAvatarById(avatarId);
    Logger.info("Avatar retrieved by ID", { avatarId });
    res.json({ avatar });
  } catch (e) {
    Logger.error("Failed to fetch avatar by ID", {
      avatarId,
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
