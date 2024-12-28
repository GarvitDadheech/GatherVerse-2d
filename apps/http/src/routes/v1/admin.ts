import { Router } from "express";
import { AdminMiddleware } from "../../middleware/admin";
import { createAvatarController } from "../../controller/avatarController";
import { createMapController } from "../../controller/mapController";
import { deleteRoomController } from "../../controller/roomController";

export const adminRouter = Router();

adminRouter.use(AdminMiddleware);

adminRouter.post("/avatar",createAvatarController);

adminRouter.post("/map",createMapController);

adminRouter.delete("/room",deleteRoomController);