import asyncHandler from "express-async-handler";
import { customAlphabet } from "nanoid";
import bunyan from "bunyan";
import { getAllUsers } from "../models/DbTest.js";
import {
  generateToken,
  InvalidCredentialsError,
  PropertyRequiredError,
  stringify,
} from "../../custom_modules/index.js";

const logger = bunyan.createLogger({ name: "User Test Controller" });
const nanoid = customAlphabet("024698ouqtyminv*^#%`~[;>|\\", 13);
const url = process.env.ALL_USERS;

// @desc        Authenticate user and get token
// @route       POST /api/users/login
// @access      Public
export const listAllUsers = asyncHandler(async (req, res) => {
  logger.info(`Route: /user/test, Requested URL: ${req.url}`);

  try {
    getAllUsers((err, rows) => {
      if (err) {
        const { status, cause, message } = err;
        logger.error(
          `Function: getAllUsers, Status: ${status}, Message: ${message}, Cause: ${cause}`
        );

        res.status(404).json({
          status: err.status,
          message: err.message,
          cause: err.cause,
        });
      } else {
        res
          .status(200)
          .json({ status: "success", payload: { data: stringify(rows) } });
      }
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({
      status: "failure",
      message: err.message,
      cause: err.stackTrace,
    });
  }
});
