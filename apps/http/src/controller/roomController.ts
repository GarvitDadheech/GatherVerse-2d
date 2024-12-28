import { Request, Response } from "express";
import { CreateRoomSchema } from "../types/roomType";
import { roomService } from "../service/roomService";

export const createRoomController = async (req: Request, res: Response) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }

  try {
    const room = await roomService.createRoom(parsedData.data);
    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

export const deleteRoomController = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  if (!roomId) {
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }
  try {
    await roomService.deleteRoom(roomId);
    res.json({
      message: "Room Deleted!",
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to delete room!",
    });
  }
};

export const getAllRoomsController = async (req: Request, res: Response) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json({ rooms });
  } catch (e) {
    res.status(400).json({
      message: "Internal Server Error!",
    });
  }
};

export const getRoomByIdController = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  if (!roomId) {
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }
  try {
    const roomData = await roomService.getRoomById(roomId);
    res.json(roomData);
  } catch (e) {
    res.status(400).json({
      message: "Failed to fetch room!",
    });
  }
};
