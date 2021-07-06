import asyncHandler from 'express-async-handler';
import { customAlphabet } from 'nanoid';
import bunyan from 'bunyan';
import {
	generateToken,
	generateUserToken,
	PropertyRequiredError,
	hashPassword,
	comparePassword
} from '../custom_modules/index.js';
import { findUserByEmail, addUser, createProfile, getUserProfile } from '../db/index.js';

const logger = bunyan.createLogger({ name: 'Auth Controller' });
const nanoid = customAlphabet('024698', 15);
const line = `\n----------------------------------------------------------------------------\n\n`;
const brk = `\n__________________________________________________________________________\n`;

// @desc        Authenticate user and get token
// @route       POST /auth/signin
// @access      Public
export const authUser = asyncHandler(async (req, res) => {
	logger.info(`Export: authUser, Route: /auth/signin, Method: POST, Requested URL: ${req.url}`);

	if (req.body.email && req.body.password) {
		const { email, password } = req.body;
		console.log(`Sign In Data: ${email} and ${password}${line}`);

		findUserByEmail(email)
			.then((user) => {
				if (user.data.docs.length == '1') {
					const userDoc = user.data.docs[0];
					console.log(`\n\tFound user by email: ${email} --> Doc: ${JSON.stringify(userDoc)}${brk}`);

					comparePassword(password, userDoc.password, (err, response) => {
						console.log(`Password comparison response: ${JSON.stringify(response)}${brk}`);

						if (response.result) {
							getUserProfile(userDoc._id)
								.then((userProfile) => {
									console.log(`Profile data: ${JSON.stringify(userProfile.data.docs[0])}${line}`);

									res.status(200).json({
										id: userDoc._id,
										rev: userDoc._rev,
										email: userDoc.email,
										profile: userProfile.data.docs[0],
										token: generateUserToken(userDoc._id, userDoc._rev, userDoc.email)
									});
								})
								.catch((err) => {
									console.log(`\n\t\tGet User Profile Error ${err.message}\n\n`);

									res.status(404).json({
										status: 'failed',
										message: 'Get User Profile Error',
										cause: err.message
									});
								});
						} else {
							console.log(`\n\t\tAuthentication Error: Invalid email or password\n\n`);

							res.status(401).json({
								status: 'failed',
								message: 'Authentication failed',
								cause: 'Invalid email or password'
							});
						}
					});
				} else {
					console.log(`\n\t\tSign In Error: ${email} is not registered\n\n`);

					res.status(404).json({
						status: 'failed',
						message: `No results found for ${email}`,
						cause: `${email} is not registered`
					});
				}
			})
			.catch((err) => {
				console.log(`\n\t\tFind User By Email Error: ${err}\n\n`);

				res.status(404).json({
					status: 'failed',
					message: err,
					cause: err.message
				});
			});
	} else {
		console.log(`\n\t\tMissing email and password\n\n`);

		res.status(404).json({
			status: 'failed',
			message: 'Missing email and password',
			cause: 'Missing authentication credentials'
		});
	}
});

// @desc        Register a new user
// @route       POST /auth/register
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {
	logger.info(`Export: registerUser, Route: /auth/register, Method: ${req.method},  Requested URL: ${req.url}`);

	// Validate submitted data
	if (req.body.email && req.body.password && req.body.type) {
		const { email, password, type } = req.body;
		logger.info(`Data Received: ${email} and ${password}`);

		// Check if email exists
		findUserByEmail(email)
			.then((data) => {
				// If email exists, tell the user
				if (data.data.docs.length > 0) {
					console.log(`\n\t\tRegistration Error: ${email} is already registered\n\n`);

					res.status(400).json({
						status: 'failed',
						message: `${email} is already registered`,
						cause: `Account already exists for this email`
					});
				} else {
					// Email does not exist, continue with registration then return new user response
					hashPassword(password, (err, hash) => {
						if (err) {
							console.log(`\n\t\tPassword Hashing Error: ${err}\n\n`);

							res.status(500).json({
								status: 'failed',
								message: `Password Hasing Error`,
								cause: err
							});
						} else {
							const id = nanoid();
							addUser(email, hash.toString(), type, id.toString())
								.then((data) => {
									console.log(data.data);
									createProfile(id.toString())
										.then((data) => {
											console.log(`\n\t\tUser profile successfully created: ${data.status}\n\n`);

											res.status(data.status).json({
												status: 'success',
												data: data.data
											});
										})
										.catch((err) => {
											console.log(`\n\t\tError creating user profile: ${err}`);

											res.status(505).json({
												status: 'failed',
												message: `Error creating user profile`,
												cause: err
											});
										});
								})
								.catch((err) => {
									console.log(`\n\t\tAdd User Error: ${err}\n\n`);

									res.status(505).json({
										status: 'failed',
										message: `Add User Error`,
										cause: err
									});
								});
						}
					});
				}
			})
			.catch((err) => {
				console.log(`\n\t\tFind user by email error: ${err}\n\n`);

				res.status(500).json({
					status: 'failed',
					message: `Find user by email error`,
					cause: err
				});
			});
	} else {
		console.log(`\n\t\tMissing required registration information\n\n`);

		res.status(417).json({
			status: 'failed',
			message: 'Missing required registration information',
			cause: 'Registration submission is missing required fields'
		});
	}
});
