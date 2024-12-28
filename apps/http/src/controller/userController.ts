import { Request, Response } from "express";
import {
  GetMetadataBulkSchema,
  OnboardUserSchema,
  UpdateMetadataSchema,
} from "../types/userType";
import { userService } from "../service/userService";

export const onboardUserController = async (req: Request, res: Response) => {
  const parsedData = OnboardUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }
  try {
    const user = await userService.onboardUser(parsedData.data);
    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(500).json({
      message: "Onboarding Failed!",
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }
  try {
    await userService.deleteUser(userId);
    res.json({
      message: "User Deleted!",
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to delete user!",
    });
  }
};

export const updateMetadataController = async (req: Request, res: Response) => {
  const parsedData = UpdateMetadataSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }
  try {
    const user = await userService.updateMetadata(parsedData.data);
    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to update metadata!",
    });
  }
};

export const getMetadataBulkController = async (
  req: Request,
  res: Response
) => {
  const parsedData = GetMetadataBulkSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }
  try {
    const metadata = await userService.getMetadataBulk(parsedData.data);
    res.json({ metadata });
  } catch (e) {
    res.status(500).json({
      message: "Failed to fetch metadata!",
    });
  }
};
