import asyncHandler from "express-async-handler";
import { customAlphabet } from "nanoid";
import bunyan from "bunyan";
import {
  generateToken,
  InvalidCredentialsError,
  PropertyRequiredError,
} from "../custom_modules/index.js";
import { getAllUsers, getUser, verifyUser } from "../db/index.js";
import { GeneralError } from "../custom_modules/MyError.js";

const logger = bunyan.createLogger({ name: "User Controller" });
const nanoid = customAlphabet("024698ouqtyminv*^#%`~[;>|\\", 13);
const findUser = process.env.DB_FIND_USER;

// @desc        Authenticate user and get token
// @route       POST /user/login
// @access      Public
export const authUser = asyncHandler(async (req, res) => {
  logger.info(
    `Export: authUser, Route: /user/login, Method: POST, Requested URL: ${req.url}`
  );
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
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new InvalidCredentialsError("Login Failed", "Invalid credentials");
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
  if (req.body.email && req.body.password) {
    const { email, password } = req.body;
    logger.info(`Data Received: ${email} and ${password}`);

    // Check if email exists
    verifyUser(email)
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
          res.json({ status: "success", payload: { data: "Good To Go!!" } });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(417);
    throw new PropertyRequiredError("email and password");
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
