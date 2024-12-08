import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export const UserMiddleware = (req : Request,res : Response,next : NextFunction) => {
    const headers = req.headers.authorization;

    if(!headers) {
        res.status(403).json({
            message : "No Authorization Header Found"
        })
        return
    }

    const token = headers.split(" ")[1];

    if(!token) {
        res.status(403).json({
            message : "No Token Found"
        })
        return
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET) as {role : string, userId : string};
        req.userId = decoded.userId;
        next();
    }
    catch(e) {
        res.status(403).json({
            message : "Invalid Token"
        })
    }

}