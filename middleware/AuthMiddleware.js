import asyncHandler from 'express-async-handler';
import { verifyToken } from '../../custom_modules/JwtMaker.js';
import UserModel from '../models/UserModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);
            console.log(decoded);
            // @ts-ignore
            req.user = await UserModel.findById(decoded.id).select('-password');
        } catch (err) {
            console.clear();
            console.log(err.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    next();
});

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};
