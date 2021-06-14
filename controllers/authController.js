import asyncHandler from "express-async-handler";
import { customAlphabet } from "nanoid";
import bunyan from "bunyan";
import {
  generateToken,
  PropertyRequiredError,
  hashPassword,
  comparePassword,
} from "../custom_modules/index.js";
import { findUserByEmail, addUser, createProfile } from "../db/index.js";

const logger = bunyan.createLogger({ name: "Auth Controller" });
const nanoid = customAlphabet("024698", 15);

// @desc        Authenticate user and get token
// @route       POST /auth/signin
// @access      Public
export const authUser = asyncHandler(async (req, res) => {
  logger.info(
    `Export: authUser, Route: /auth/signin, Method: POST, Requested URL: ${req.url}`
  );

  if (req.body.email && req.body.password) {
    const { email, password } = req.body;
    console.log(`Sign In Data: ${email} and ${password}`);

    findUserByEmail(email)
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
                token: generateToken(doc._id, doc._rev),
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
            cause: `${email} is not registered`,
          });
        }
      })
      .catch((err) => {
        res.status(501).json({
          status: err.status,
          message: err,
          cause: err.message,
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
// @route       POST /auth/register
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {
  logger.info(
    `Export: registerUser, Route: /auth/register, Method: ${req.method},  Requested URL: ${req.url}`
  );

  // Validate submitted data
  if (req.body.email && req.body.password && req.body.type) {
    const { email, password, type } = req.body;
    logger.info(`Data Received: ${email} and ${password}`);

    // Check if email exists
    findUserByEmail(email)
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
              console.log(err);
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
    res.status(417).json({
      status: "failed",
      message: "Missing required registration information",
      cause: "Registration submission is missing required fields",
    });
  }
});
