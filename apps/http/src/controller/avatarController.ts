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
