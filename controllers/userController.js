import asyncHandler from 'express-async-handler';
import { customAlphabet } from 'nanoid';
import bunyan from 'bunyan';
import { generateToken, InvalidCredentialsError, PropertyRequiredError } from '../custom_modules/index.js';
import { getAllUsers } from '../db/index.js';
import { GeneralError } from '../custom_modules/MyError.js';

const logger = bunyan.createLogger({ name: 'User Controller' });
const nanoid = customAlphabet('024698ouqtyminv*^#%`~[;>|\\', 13);

// @desc        Authenticate user and get token
// @route       POST /user/login
// @access      Public
export const authUser = asyncHandler(async (req, res) => {
	logger.info(`Export: authUser, Route: /user/login, Method: POST, Requested URL: ${req.url}`);
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email: `${email}` });

	// @ts-ignore
	if (user && (await user.matchPassword(password))) {
		res.json({
			// @ts-ignore
			_id: user._id,
			// @ts-ignore
			fname: user.fname,
			// @ts-ignore
			lname: user.lname,
			// @ts-ignore
			email: user.email,
			// @ts-ignore
			isAdmin: user.isAdmin || false,
			token: generateToken(user._id)
		});
	} else {
		res.status(401);
		throw new InvalidCredentialsError('Login Failed', 'Invalid credentials');
	}
});

// @desc        Register a new user
// @route       POST /user/register
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {
	logger.info(`Export: registerUser, Route: /user/register, Method: POST,  Requested URL: ${req.url}`);

	// Check if user exists

	// Create new user

	// Return new user response

	if (req.body.email && req.body.password) {
		const { email, password } = req.body;
		res.json({ status: 'success', payload: { data: 'Good To Go!!' } });
	} else {
		res.status(417);
		throw new PropertyRequiredError('email and password');
	}
});

// @desc        List all SJH users
// @route       GET /user/list
// @access      Public
export const getUsersList = asyncHandler(async (req, res) => {
	logger.info(`Export: getUsersList, Route: /user/list, Method: GET, Requested URL: ${req.url}`);

	getAllUsers((err, data) => {
		if (err) {
      res.status(501);
      throw new GeneralError("", err);
		} else {
			res.status(200).json({
				status: data.status,
				data: data.data,
				size: data.size
			});
		}
	});
});
