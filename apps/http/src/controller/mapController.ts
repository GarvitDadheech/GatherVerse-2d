import { Request, Response } from "express";
import { CreateMapSchema } from "../types/mapType";
import { mapService } from "../service/mapService";

export const createMapController = async (req: Request, res: Response) => {
  const parsedData = CreateMapSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Data Recieved!",
    });
    return;
  }

  try {
    const map = await mapService.createMap(parsedData.data);
    res.json({
      mapId: map.id,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
