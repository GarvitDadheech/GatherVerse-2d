import { CreateMapData } from "../types/mapType";
import client from "@repo/db";

class MapService {
  async createMap(mapData: CreateMapData) {
    try {
      const map = await client.map.create({
        data: {
          name: mapData.name,
          thumbnail: mapData.thumbnail,
          width: Number(mapData.dimensions.split("x")[1]),
          height: Number(mapData.dimensions.split("x")[0]),
          mapElements: {
            create: mapData.defaultElements.map((element) => ({
              elementId: element.elementId,
              x: element.x,
              y: element.y,
            })),
          },
        },
      });
      return map;
    } catch (error) {
      throw new Error("Failed to create map");
    }
  }
}

export const mapService = new MapService();
