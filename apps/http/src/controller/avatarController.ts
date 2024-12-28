import client from "@repo/db";
import { CreateAvatarSchema } from "../types/avatarType";
import { Request, Response } from "express";
import { avatarService } from "../service/avatarService";

export const createAvatarController = async (req: Request, res: Response) => {
  const parsedData = CreateAvatarSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Data Recieved!",
    });
    return;
  }
  try {
    const avatar = await avatarService.createAvatar(parsedData.data);

    res.json({
      avatarId: avatar.id,
    });
  } catch (e) {
    res.status(400).json({
      message: "Internal Server Error!",
    });
  }
};

export const getAvatarsController = async (req: Request, res: Response) => {
  try {
    const avatars = await avatarService.getAvatars();
    res.json({ avatars });
  } catch (e) {
    throw new Error("Failed to fetch avatars");
  }
};

export const getAvatarByIdController = async (req: Request, res: Response) => {
  const avatarId = req.params.id;
  if (!avatarId) {
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }
  try {
    const avatar = await avatarService.getAvatarById(avatarId);
    res.json({ avatar });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
