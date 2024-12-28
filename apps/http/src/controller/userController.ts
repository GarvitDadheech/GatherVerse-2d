import { Request, Response } from "express";
import {
  GetMetadataBulkSchema,
  OnboardUserSchema,
  UpdateMetadataSchema,
} from "../types/userType";
import { userService } from "../service/userService";
import Logger from "@repo/logger";

export const onboardUserController = async (req: Request, res: Response) => {
  Logger.info("Inside onboardUserController", { body: req.body });

  const parsedData = OnboardUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    Logger.warn("Invalid user onboarding data", {
      errors: parsedData.error.errors,
    });
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }

  try {
    Logger.info("Onboarding user", { parsedData: parsedData.data });
    const token = await userService.onboardUser(parsedData.data);
    Logger.info("User onboarded successfully");

    res.json({
      token,
    });
  } catch (e) {
    Logger.error("Failed to onboard user", {
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(500).json({
      message: "Onboarding Failed!",
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  Logger.info("Inside deleteUserController", { userId: req.params.id });

  const userId = req.params.id;
  if (!userId) {
    Logger.warn("User ID missing in delete request");
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }

  try {
    Logger.info("Deleting user", { userId });
    await userService.deleteUser(userId);
    Logger.info("User deleted successfully", { userId });

    res.json({
      message: "User Deleted!",
    });
  } catch (e) {
    Logger.error("Failed to delete user", {
      userId,
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(500).json({
      message: "Failed to delete user!",
    });
  }
};

export const updateMetadataController = async (req: Request, res: Response) => {
  Logger.info("Inside updateMetadataController", { body: req.body });

  const parsedData = UpdateMetadataSchema.safeParse(req.body);
  if (!parsedData.success) {
    Logger.warn("Invalid metadata update data", {
      errors: parsedData.error.errors,
    });
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }

  try {
    Logger.info("Updating user metadata", { parsedData: parsedData.data });
    const user = await userService.updateMetadata(parsedData.data);
    Logger.info("User metadata updated successfully", { userId: user.id });

    res.json({
      userId: user.id,
    });
  } catch (e) {
    Logger.error("Failed to update user metadata", {
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(500).json({
      message: "Failed to update metadata!",
    });
  }
};

export const getMetadataBulkController = async (
  req: Request,
  res: Response
) => {
  Logger.info("Inside getMetadataBulkController", { body: req.body });

  const parsedData = GetMetadataBulkSchema.safeParse(req.body);
  if (!parsedData.success) {
    Logger.warn("Invalid bulk metadata request data", {
      errors: parsedData.error.errors,
    });
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }

  try {
    Logger.info("Fetching bulk metadata", { parsedData: parsedData.data });
    const metadata = await userService.getMetadataBulk(parsedData.data);
    Logger.info("Bulk metadata retrieved successfully", {
      count: Object.keys(metadata).length,
    });

    res.json({ metadata });
  } catch (e) {
    Logger.error("Failed to fetch bulk metadata", {
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(500).json({
      message: "Failed to fetch metadata!",
    });
  }
};
