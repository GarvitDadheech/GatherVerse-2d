import { Router } from "express";
import {
  createRoomController,
  deleteRoomController,
  getAllRoomsController,
  getRoomByIdController,
} from "../../controller/roomController";
import { userMiddleware } from "../../middleware/user";

export const roomRouter = Router();

roomRouter.post("/", userMiddleware ,createRoomController);
roomRouter.get("/all", getAllRoomsController);
roomRouter.get("/:roomId", getRoomByIdController);
