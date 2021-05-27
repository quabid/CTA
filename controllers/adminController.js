import asyncHandler from "express-async-handler";
import { customAlphabet } from "nanoid";
import bunyan from "bunyan";
import {
  generateToken,
  PropertyRequiredError,
  hashPassword,
  comparePassword,
} from "../custom_modules/index.js";
import {
  getAllUsers,
  findUserByEmail,
  findUserByIdAndRev,
  addUser,
  createProfile,
} from "../db/index.js";

const logger = bunyan.createLogger({ name: "User Controller" });
const nanoid = customAlphabet("024698", 15);

// @desc        List all SJH users
// @route       POST /user/list
// @access      Public
export const getUsersList = asyncHandler(async (req, res) => {
  logger.info(
    `Export: getUsersList, Route: /user/list, Method: ${req.method}, Requested URL: ${req.url}`
  );

  getAllUsers()
    .then((data) => {
      res.status(200).json({
        status: data.status,
        data: data.data,
        size: data.size,
      });
    })
    .catch((err) => {
      res.status(501).json({
        status: data.status,
        message: data.message,
      });
    });
});

// @desc        Find user by email
// @route       POST /user/find
// @access      Public
export const getUserByEmail = asyncHandler(async (req, res) => {
  logger.info(
    `Export: getUser, Route: /user/find, Method: ${req.method}, Requested URL: ${req.url}`
  );

  if (req.body.email) {
    const { email } = req.body;

    findUserByEmail(email)
      .then((data) => {
        console.log(data);
        if (data.data.docs.length == "1") {
          res.status(200).json({
            status: "success",
            data: data.data.docs[0],
            size: data.data.docs.length,
          });
        } else {
          res.status(404).json({
            status: "failed",
            message: `No results found for ${email}`,
          });
        }
      })
      .catch((err) => {
        res.status(501).json({
          status: err.status,
          message: err.message,
        });
      });
  } else {
    res.status(411).json({
      status: "failed",
      message: "Require JSON with email property",
      cause: "Missing post data",
    });
  }
});

// @desc        Find user by id and rev
// @route       POST /user/find
// @access      Public
export const getUserById = asyncHandler(async (req, res) => {
  logger.info(
    `Export: getUser, Route: /user/find, Method: ${req.method}, Requested URL: ${req.url}`
  );

  if (req.body.id && req.body.rev) {
    const { id, rev } = req.body;

    findUserByIdAndRev(id, rev)
      .then((data) => {
        console.log(data);
        if (data.data.docs.length == "1") {
          res.status(200).json({
            status: "success",
            data: data.data.docs[0],
            size: data.data.docs.length,
          });
        } else {
          res.status(404).json({
            status: "failed",
            message: `No results found for ${email}`,
          });
        }
      })
      .catch((err) => {
        res.status(501).json({
          status: err.status,
          message: err.message,
        });
      });
  } else {
    res.status(411).json({
      status: "failed",
      message: "Require JSON with email property",
      cause: "Missing post data",
    });
  }
});
