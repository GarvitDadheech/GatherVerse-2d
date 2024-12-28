import { Request, Response } from "express";
import { CreateRoomSchema } from "../types/roomType";
import { roomService } from "../service/roomService";
import Logger from "@repo/logger";

export const createRoomController = async (req: Request, res: Response) => {
  Logger.info("Inside createRoomController", { body: req.body });

  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    Logger.warn("Invalid room creation data", {
      errors: parsedData.error.errors,
    });
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }

  try {
    Logger.info("Creating room", { parsedData: parsedData.data });
    const room = await roomService.createRoom(parsedData.data);
    Logger.info("Room created successfully", { roomId: room.id });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    Logger.error("Failed to create room", {
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

export const deleteRoomController = async (req: Request, res: Response) => {
  Logger.info("Inside deleteRoomController", { roomId: req.params.id });

  const roomId = req.params.id;
  if (!roomId) {
    Logger.warn("Room ID missing in delete request");
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }

  try {
    Logger.info("Deleting room", { roomId });
    await roomService.deleteRoom(roomId);
    Logger.info("Room deleted successfully", { roomId });

    res.json({
      message: "Room Deleted!",
    });
  } catch (e) {
    Logger.error("Failed to delete room", {
      roomId,
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(500).json({
      message: "Failed to delete room!",
    });
  }
};

export const getAllRoomsController = async (req: Request, res: Response) => {
  Logger.info("Inside getAllRoomsController");

  try {
    Logger.info("Fetching all rooms");
    const rooms = await roomService.getAllRooms();
    Logger.info("Rooms retrieved successfully", { count: rooms.length });

    res.json({ rooms });
  } catch (e) {
    Logger.error("Failed to fetch all rooms", {
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(400).json({
      message: "Internal Server Error!",
    });
  }
};

export const getRoomByIdController = async (req: Request, res: Response) => {
  Logger.info("Inside getRoomByIdController", { roomId: req.params.id });

  const roomId = req.params.id;
  if (!roomId) {
    Logger.warn("Room ID missing in request");
    res.status(400).json({
      message: "Invalid Data Received!",
    });
    return;
  }

  try {
    Logger.info("Fetching room by ID", { roomId });
    const roomData = await roomService.getRoomById(roomId);
    Logger.info("Room retrieved successfully", { roomId });

    res.json(roomData);
  } catch (e) {
    Logger.error("Failed to fetch room by ID", {
      roomId,
      error: e instanceof Error ? e.message : "Unknown error",
    });
    res.status(400).json({
      message: "Failed to fetch room!",
    });
  }
};
