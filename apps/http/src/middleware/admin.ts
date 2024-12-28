import { NextFunction, Request, Response } from "express";
import { ADMIN_PASSWORD } from "@repo/config";
import Logger from "@repo/logger";

export const AdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.info("Admin authentication attempt", {
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  const adminPassword = req.headers["x-admin-password"];

  if (adminPassword !== ADMIN_PASSWORD) {
    Logger.warn("Failed admin authentication attempt", {
      path: req.path,
      method: req.method,
      ip: req.ip,
      reason: "Invalid admin password",
    });

    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  Logger.info("Admin authentication successful", {
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  next();
};
