import { NextFunction, Request, Response } from "express";
import { JWT_SECRET, ADMIN_PASSWORD } from "@repo/config";
import jwt from "jsonwebtoken";

export const AdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== ADMIN_PASSWORD) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  next();
};
