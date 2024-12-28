import { Router } from "express";
import {
  getMetadataBulkController,
  onboardUserController,
  updateMetadataController,
} from "../../controller/userController";
import { userMiddleware } from "../../middleware/user";

export const userRouter = Router();

userRouter.post("/onboard", onboardUserController);
userRouter.put("/metadata", userMiddleware,updateMetadataController);
userRouter.get("/metadata/bulk", getMetadataBulkController);
