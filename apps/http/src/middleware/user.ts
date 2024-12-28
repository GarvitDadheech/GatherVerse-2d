const jwt = require('jsonwebtoken');
import { JWT_SECRET } from '@repo/config'
import { NextFunction, Request, Response } from 'express';

export const userMiddleware = (req : Request, res : Response, next : NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized - Invalid or expired token' });
  }
};

