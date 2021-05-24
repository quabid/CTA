import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = id =>
    jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });

export const verifyToken = token => jwt.verify(token, JWT_SECRET);