import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import { elementRouter } from "./element";
import { avatarRouter } from "./avatar";

export const router = Router();

router.use("/user",userRouter);
router.use("/user",spaceRouter);
router.use("/admin",adminRouter);
router.use("/element",elementRouter);
router.use("/avatar",avatarRouter);