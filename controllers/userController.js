import asyncHandler from "express-async-handler";
import bunyan from "bunyan";
import {
  generateToken,
  PropertyRequiredError,
  hashPassword,
  comparePassword,
} from "../custom_modules/index.js";
import {
  createProfile,
  updateEmail,
  updatePassword,
  updateProfile,
} from "../db/index.js";

const logger = bunyan.createLogger({ name: "User Controller" });

// @desc        Create user profile
// @route       POST /user/profile/create
// @access      Private
export const createUserProfile = asyncHandler(async (req, res) => {
  logger.info(
    `Export: createUserProfile, Route: /user/profile/create, Method: POST, Requested URL: ${req.url}`
  );

  res.status(200).json({
    status: "success",
    url: `${req.url}`,
  });
});

// @desc        Update email
// @route       POST /user/email
// @access      Private
export const updateUserEmail = asyncHandler(async (req, res) => {
  logger.info(
    `Export: updateUserEmail, Route: /user/email, Method: POST, Requested URL: ${req.url}`
  );

  res.status(200).json({
    status: "success",
    url: `${req.url}`,
  });
});

// @desc        Update password
// @route       POST /user/pwd
// @access      Private
export const updateUserPassword = asyncHandler(async (req, res) => {
  logger.info(
    `Export: updateUserPassword, Route: /user/pwd, Method: POST, Requested URL: ${req.url}`
  );

  res.status(200).json({
    status: "success",
    url: `${req.url}`,
  });
});

// @desc        Update profile
// @route       POST /user/profile/update
// @access      Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  logger.info(
    `Export: updateUserProfile, Route: /user/profile/update, Method: POST, Requested URL: ${req.url}`
  );

  res.status(200).json({
    status: "success",
    url: `${req.url}`,
  });
});
