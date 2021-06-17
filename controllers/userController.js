import asyncHandler from 'express-async-handler';
import bunyan from 'bunyan';
import { generateToken, PropertyRequiredError, hashPassword, comparePassword } from '../custom_modules/index.js';
import {
	createProfile,
	updateEmail,
	updatePassword,
	updateProfile,
	findUserByEmail,
	getUserProfile
} from '../db/index.js';

const logger = bunyan.createLogger({ name: 'User Controller' });

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
export const updateUserPassword = asyncHandler(async (req, res) => {
	logger.info(`Export: updateUserPassword, Route: /user/pwd, Method: POST, Requested URL: ${req.url}`);

	res.status(200).json({
		status: 'success',
		url: `${req.url}`
	});
});

// @desc        Update profile
// @route       POST /user/profile/update
// @access      Private
export const updateUserProfile = asyncHandler(async (req, res) => {
	logger.info(`Export: updateUserProfile, Route: /user/profile/update, Method: POST, Requested URL: ${req.url}`);

	const { email } = req.body;
	const updateObj = {};

	if (req.body.fname) {
		updateObj.fname = req.body.fname;
	}

	if (req.body.lname) {
		updateObj.lname = req.body.lname;
	}

	if (req.body.gender) {
		updateObj.gender = req.body.gender;
	}

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
							res.status(200).json({
								status: 'success',
								payload: data.data
							});
						})
						.catch((err) => {
							console.log(`\nProfile update failed: ${err}\n`);
							res.status(409).json({
								status: failed,
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
