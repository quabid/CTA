import asyncHandler from "express-async-handler";
import { customAlphabet } from "nanoid";
import bunyan from "bunyan";
import {
  generateToken,
  InvalidCredentialsError,
  PropertyRequiredError,
  hashPassword,
  comparePassword,
} from "../custom_modules/index.js";
import { getAllUsers, getUser, addUser, createProfile } from "../db/index.js";
import { GeneralError } from "../custom_modules/MyError.js";

const logger = bunyan.createLogger({ name: "User Controller" });
const nanoid = customAlphabet("024698", 15);
const findUser = process.env.DB_FIND_USER;

// @desc        Authenticate user and get token
// @route       POST /user/loginconsole.log(err)
// @access      Public
export const authUser = asyncHandler(async (req, res) => {
  logger.info(
    `Export: authUser, Route: /user/login, Method: POST, Requested URL: ${req.url}`
  );

  if (req.body.email && req.body.password) {
    const { email, password } = req.body;

    getUser(email)
      .then((data) => {
        if (data.data.docs.length == "1") {
          const doc = data.data.docs[0];
          console.log(doc);
          comparePassword(password, doc.password, (err, response) => {
            console.log(response);
            if (response.result) {
              res.json({
                id: doc._id,
                rev: doc._rev,
                email: doc.email,
                isAdmin: doc.admin || false,
                token: generateToken(doc._id),
              });
            } else {
              res.status(401).json({
                status: "failed",
                message: "Authentication failed",
                cause: "Invalid email or password",
              });
            }
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
    console.log(`Missing email and password\n`);
    res.status(404).json({
      status: "failed",
      message: "Missing email and password",
      cause: "Missing authentication credentials",
    });
  }
});

// @desc        Register a new user
// @route       POST /user/register
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {
  logger.info(
    `Export: registerUser, Route: /user/register, Method: ${req.method},  Requested URL: ${req.url}`
  );

  // Validate submitted data
  if (req.body.email && req.body.password && req.body.type) {
    const { email, password, type } = req.body;
    logger.info(`Data Received: ${email} and ${password}`);

    // Check if email exists
    getUser(email)
      .then((data) => {
        // If email exists, tell the user
        if (data.data.docs.length > 0) {
          res.status(400).json({
            status: "failed",
            message: `${email} is already registered`,
            cause: `Account already exists for this email`,
          });
        } else {
          // Email does not exist, continue with registration then return new user response
          hashPassword(password, (err, hash) => {
            if (err) {
              res.status(500).json({
                status: "failed",
                message: err,
              });
            } else {
              const id = nanoid();
              addUser(email, hash.toString(), type, id.toString())
                .then((data) => {
                  console.log(data.data);
                  createProfile(id.toString())
                    .then((data) => {
                      console.log(data.data);
                      res.status(200).json({
                        status: "success",
                        data: data.data,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      res.status(505).json({
                        status: "failed",
                        message: err,
                      });
                    });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(505).json({
                    status: "failed",
                    message: err,
                  });
                });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: "failed",
          message: err,
        });
      });
  } else {
    res.status(417);
    throw new PropertyRequiredError("email, password and type");
  }
});

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

// @desc        Get SJH user
// @route       POST /user/find
// @access      Public
export const getSingleUser = asyncHandler(async (req, res) => {
  logger.info(
    `Export: getUser, Route: /user/find, Method: ${req.method}, Requested URL: ${req.url}`
  );

  if (req.body.email) {
    const { email } = req.body;

    getUser(email)
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
