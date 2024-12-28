import client from "@repo/db";
import { CreateRoomData, DeleteRoomData, GetRoomsByIdData } from "../types/roomType";

class RoomService {
  async createRoom(data: CreateRoomData) {
    try {
      const roomData = {
        name: data.name,
        description: data.description,
        mapId: data.mapId,
        maxUsers: data.maxUsers,
      };
      return await client.room.create({ data: roomData });
    } catch (error) {
      throw new Error(`Failed to create room: ${error}`);
    }
  }

  async deleteRoom(data: DeleteRoomData) {
    try {
      const roomId = data.roomId;
      const room = await client.room.findUnique({
        where: { id: roomId },
      });

      if (!room) {
        throw new Error("Invalid Room Id");
      }

      return await client.room.delete({
        where: { id: roomId },
      });
    } catch (error) {
      throw new Error(`Failed to delete room: ${error}`);
    }
  }

  async getAllRooms() {
    const rooms = await client.room.findMany({});

    return rooms.map((room) => ({
      id: room.id,
      name: room.name,
      description: room.description,
      thumbnail: room.thumbnail,
    }));
  }

  async getRoomById(data : GetRoomsByIdData) {
    const roomId = data.roomId;
    const room = await client.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      throw new Error("Invalid Room Id");
    }

    const mapId = room.mapId;

    const map = await client.map.findUnique({
      where: { id: mapId },
      include: {
        mapElements: {
          include: {
            element: true,
          },
        },
      },
    });

    if(!map) {
        throw new Error("Invalid Map Id");
    }

    return {
      dimensions: `${map.height}x${map.width}`,
      elements: map.mapElements.map((e) => ({
        id: e.id,
        element: {
          id: e.element.id,
          imageUrl: e.element.imageUrl,
          width: e.element.width,
          height: e.element.height,
          isStatic: e.element.isStatic,
        },
        x: e.x,
        y: e.y,
      })),
    };
  }
}

export const roomService = new RoomService();
