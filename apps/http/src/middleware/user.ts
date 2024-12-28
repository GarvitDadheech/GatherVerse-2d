const jwt = require("jsonwebtoken");
import { JWT_SECRET } from "@repo/config";
import { NextFunction, Request, Response } from "express";
import Logger from "@repo/logger";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.info("User authentication attempt", {
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    Logger.warn("Authentication failed - No token provided", {
      path: req.path,
      method: req.method,
      ip: req.ip,
    });

    res.status(401).json({ message: "Token required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    req.userId = userId;

    Logger.info("User authentication successful", {
      path: req.path,
      method: req.method,
      ip: req.ip,
      userId,
    });

    next();
  } catch (error) {
    Logger.warn("Authentication failed - Invalid token", {
      path: req.path,
      method: req.method,
      ip: req.ip,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    res
      .status(403)
      .json({ message: "Unauthorized - Invalid or expired token" });
  }
};
