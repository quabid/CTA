import axios from "axios";
import { stringify, objectKeysCount } from "../custom_modules/index.js";
const allUsers = process.env.ALL_USERS;
const findUser = process.env.DB_FIND_USER_BASE;

// Get all users
export const getAllUsers = async () => {
  return await axios({
    method: "get",
    url: allUsers,
  });
};

// Find user by email
export const getUser = async (email) => {
  return await axios({
    method: "post",
    url: findUser,
    data: {
      selector: {
        email: email,
      },
    },
  });
};

// Verify User by email
export const verifyUser = async (email) => {
  return await axios({
    method: "post",
    url: findUser,
    data: {
      selector: {
        email: email,
      },
    },
  });
};
