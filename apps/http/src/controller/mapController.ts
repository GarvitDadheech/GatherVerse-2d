import { Request, Response } from "express";
import { CreateMapSchema } from "../types/mapType";
import { mapService } from "../service/mapService";
import Logger from "@repo/logger";

export const createMapController = async (req: Request, res: Response) => {
  Logger.info("Inside createMapController", { body: req.body });

  const parsedData = CreateMapSchema.safeParse(req.body);

  if (!parsedData.success) {
    Logger.warn("Invalid map creation data", {
      errors: parsedData.error.errors,
    });
    res.status(400).json({
      message: "Invalid Data Recieved!",
    });
    return;
  }

  try {
    Logger.info("Creating map", { parsedData: parsedData.data });
    const map = await mapService.createMap(parsedData.data);
    Logger.info("Map created successfully", { mapId: map.id });

    res.json({
      mapId: map.id,
    });
  } catch (e) {
    Logger.error("Failed to create map", {
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
