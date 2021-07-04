import asyncHandler from 'express-async-handler';
import { verifyToken } from '../custom_modules/index.js';
import { findUserByIdAndRev, findUserByEmail } from '../db/index.js';

export const protect = asyncHandler(async (req, res, next) => {
	let token;

	console.log(`\n${JSON.stringify(req.headers.authorization)}\n`);

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = verifyToken(token);
			console.log(`\n\t\tDecoded Token ${JSON.stringify(decoded)}\n\n`);
			const { data } = await findUserByEmail(decoded.email);
			// console.log(data);
			req.user = data.docs[0];
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
