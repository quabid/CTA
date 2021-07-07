import asyncHandler from 'express-async-handler';
import bunyan from 'bunyan';
import {
	generateToken,
	PropertyRequiredError,
	hashPassword,
	comparePassword,
	verifyUserToken
} from '../custom_modules/index.js';
import { updateEmail, updateProfile, findUserByEmail, getUserProfile } from '../db/index.js';

const logger = bunyan.createLogger({ name: 'User Controller' });
const line = `\n----------------------------------------------------------------------------\n\n`;
const brk = `\n__________________________________________________________________________\n`;

// @desc        Create user profile
// @route       POST /user/profile/create
// @access      Private
export const createUserProfile = asyncHandler(async (req, res) => {
	logger.info(`Export: createUserProfile, Route: /user/profile/create, Method: POST, Requested URL: ${req.url}`);

	const { fname, lname } = req.body;
	const gender = 'male';

	updateProfile('63a4354054e100f15eb4f212190065a2', '1-addefebcdca7d11618e2376e14208ef3', fname, lname, gender)
		.then((data) => {
			console.log(data);
			res.status(200).json({
				status: 'success',
				payload: data.data
			});
		})
		.catch((err) => {
			console.log(err.message);
			res.status(402).json({
				status: 'failed',
				error: err.message
			});
		});
	updateUserProfile;
	logger.info(`Export: updateUserEmail, Route: /user/email, Method: POST, Requested URL: ${req.url}`);

	res.status(200).json({
		status: 'success',
		url: `${req.url}`
	});
});

// @desc        Update password
// @route       POST /user/pwd
// @access      Private
export const updateUserEmail = asyncHandler(async (req, res) => {
	logger.info(`Export: updateUserPassword, Route: /user/pwd, Method: POST, Requested URL: ${req.url}`);

	const { oldEmail, newEmail } = req.body;
	const updateObj = {};

	// Find user by email
	// Use the user._id to find the profile
	// Update the user's profile with given data

	findUserByEmail(oldEmail)
		.then((data) => {
			console.log(`\n\tFound user by email: ${JSON.stringify(data.data)}\n`);

			// Get the user._id
			const userId = data.data.docs[0]._id;
			const userRev = data.data.docs[0]._rev;

			// Assign user data to the updateObj
			Object.assign(updateObj, data.data.docs[0]);

			// Replace the oldEmail
			updateObj.email = newEmail;

			console.log(`\n\t\tNew email: ${JSON.stringify(updateObj)}\n`);

			// Update the user's email
			updateEmail(userId, userRev, updateObj)
				.then((data) => {
					console.log(`\n\tUpdated user's email: ${data.data}\n`);
					res.status(200).json({
						status: 'success',
						payload: data.data.docs[0]
					});
				})
				.catch((err) => {
					console.log(`\nUpdate user's email failed: ${JSON.stringify(err)}\n`);
					res.status(409).json({
						status: 'failed',
						message: err
					});
				});
		})
		.catch((err) => {
			console.log(`\nFind the user by email failed: ${err}\n`);
			res.status(404).json({
				status: 'failed'
			});
		});
});

// @desc        Update profile
// @route       POST /user/profile/update
// @access      Private
export const updateUserProfile = asyncHandler(async (req, res) => {
	logger.info(`Export: updateUserProfile, Route: /user/profile/update, Method: POST, Requested URL: ${req.url}`);

	const { email } = req.body.payload;
	const updateObj = {};

	console.log(`\n\tUpdated Profile Data: ${JSON.stringify(req.body)}\n`);

	if (req.body.payload.fname) {
		updateObj.fname = req.body.payload.fname;
	}

	if (req.body.payload.lname) {
		updateObj.lname = req.body.payload.lname;
	}

	if (req.body.payload.gender) {
		updateObj.gender = req.body.payload.gender;
	}

	console.log(`\n\tUser's profile update data: ${JSON.stringify(updateObj)}\n`);

	// Find user by email
	// Use the user._id to find the profile
	// Update the user's profile with given data

	findUserByEmail(email)
		.then((data) => {
			console.log(`\n\tFound user by email: ${JSON.stringify(data.data)}\n`);

			// Get the user._id
			const userId = data.data.docs[0]._id;

			// Add the user key with value of userId
			updateObj.user = userId;

			// Find the user's profile where the user key == userId
			getUserProfile(userId)
				.then((data) => {
					console.log(`\n\tFound user's profile: ${JSON.stringify(data.data)}\n`);

					// Use the profile's _id & _rev for updating
					const profileId = data.data.docs[0]._id;
					const profileRev = data.data.docs[0]._rev;

					// Update the profile document
					updateProfile(profileId, profileRev, updateObj)
						.then((data) => {
							console.log(`\n\tUser Profile Updated: ${JSON.stringify(data.data)}\n`);
							res.status(200).json({
								status: 'success',
								payload: data.data
							});
						})
						.catch((err) => {
							console.log(`\nProfile update failed: ${err}\n`);
							res.status(409).json({
								status: 'failed',
								error: err
							});
						});
				})
				.catch((err) => {
					console.log(`\nFind the user profile failed: ${err}\n`);
					res.status(404).json({
						status: 'failed',
						error: err
					});
				});
		})
		.catch((err) => {
			console.log(`\nFind the user by email failed: ${err}\n`);
			res.status(404).json({
				status: 'failed'
			});
		});
});

// @desc        Get profile
// @route       GET /user/profile
// @access      Private
export const usersProfile = asyncHandler(async (req, res) => {
	logger.info(`Export: usersProfile, Route: /user/profile, Method: GET, Requested URL: ${req.url}`);

	const { token } = req.params;
	const decoded = verifyUserToken(token);
	const email = decoded.email;

	console.log(`\n\t\tEmail: ${email}`);

	findUserByEmail(email)
		.then((user) => {
			console.log(`\n\tFound user by email: ${JSON.stringify(user.data)}\n`);

			// Get the user._id
			const userId = user.data.docs[0]._id;

			// Find the user's profile where the user key == userId
			getUserProfile(userId)
				.then((profile) => {
					console.log(`\n\tFound user's profile: ${JSON.stringify(profile.data)}\n`);
					res.status(200).json({
						status: 'success',
						payload: profile.data.docs[0]
					});
				})
				.catch((err) => {
					console.log(`\nFind the user profile failed: ${err}\n`);
					res.status(404).json({
						status: 'failed',
						error: err
					});
				});
		})
		.catch((err) => {
			console.log(`\nFind the user by email failed: ${err}\n`);
			res.status(404).json({
				status: 'failed'
			});
		});
});

// @desc		Get signout
// @route		GET /user/signout
// @access		Private
export const userSignout = asyncHandler(async (req, res) => {
	logger.info(`Export: userSignout, Route: /user/signout, Method: GET, Requested URL: ${req.url}`);

	const token = req.params.token || null;
	const decoded = verifyUserToken(token);
	const email = decoded.email;

	console.log(`\n\n\t\tSign Out Tokey: ${token}\n\t\tSign Out Email: ${email}`);

	if (undefined != email) {
		console.log(`${brk}Looking for user ${email}${brk}`);

		findUserByEmail(email)
			.then((user) => {
				console.log(
					`${line}\tFound user by email ${user.data.docs[0].email}${brk}\tUser requested signout${brk}`
				);
				req.user = null;
				delete req['user'];
				res.status(200).json({
					status: 'success',
					message: 'Sign Out Successful'
				});
			})
			.catch((err) => {
				console.log(`\nUser ${email} not found${line}${err}${brk}`);
				res.status(405).json({
					status: 'failed',
					cause: `User ${email} not found`
				});
			});
	} else {
		console.log(`\nNo user${brk}`);
		res.status(401).json({
			status: 'failed',
			error: 'Not authorized',
			cause: 'User is not signed in'
		});
	}
});
