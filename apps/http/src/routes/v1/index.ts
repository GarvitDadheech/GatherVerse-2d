import { Router } from "express";
import { userRouter } from "./user";
import { roomRouter } from "./room";
import { adminRouter } from "./admin";
import { avatarRouter } from "./avatar";

export const router = Router();

router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/admin", adminRouter);
router.use("/avatar", avatarRouter);
