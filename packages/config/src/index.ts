import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "supersecret"

export const ADMIN_PASSWORD = process.env.ADMIN_SECRET || "adminpassword"

export const HTTP_URL = process.env.PORT || "localhost:3000"

export const WS_URL = process.env.WS_PORT || "localhost:3001"

export const WS_PORT = Number(process.env.WS_PORT )|| 3001

export const HTTP_PORT = Number(process.env.PORT) || 3000