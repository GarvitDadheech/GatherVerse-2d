import { Router } from "express";
import {
  createRoomController,
  deleteRoomController,
  getAllRoomsController,
  getRoomByIdController,
} from "../../controller/roomController";

export const roomRouter = Router();

roomRouter.post("/", createRoomController);
roomRouter.delete("/:roomId", deleteRoomController);
roomRouter.get("/all", getAllRoomsController);
roomRouter.get("/:roomId", getRoomByIdController);
