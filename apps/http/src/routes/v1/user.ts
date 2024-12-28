import { Router } from "express";
import {
  getMetadataBulkController,
  onboardUserController,
  updateMetadataController,
} from "../../controller/userController";

export const userRouter = Router();

userRouter.post("/onboard", onboardUserController);
userRouter.put("/metadata", updateMetadataController);
userRouter.get("/metadata/bulk", getMetadataBulkController);
