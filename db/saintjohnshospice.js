import axios from "axios";
import {
  stringify,
  objectKeysCount,
  hashPassword,
} from "../custom_modules/index.js";
const allUsers = process.env.ALL_USERS;
const findUser = process.env.DB_FIND_USER_BASE;
const newUser = process.env.DB_ADD_NEW_USER_BASE;
const newUserProfile = process.env.DB_ADD_NEW_USER_PROFILES_BASE;

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

// Find user by id
export const getUser = async (id) => {
  return await axios({
    method: "post",
    url: findUser,
    data: {
      selector: {
        _id: id,
      },
    },
  });
};

// Add new user
export const addUser = async (email, password, type, id) => {
  return await axios({
    method: "post",
    url: newUser,
    data: {
      docs: [
        {
          _id: id,
          email: email,
          password: password,
          type: type,
          admin: false,
        },
      ],
    },
  });
};

// Update user email
export const updateEmail = async (id, rev, email) =>
  new Promise().resolve({ id, rev, email });

// Update user password
export const updatePassword = async (id, rev, password) =>
  new Promise().resolve({ id, rev, password });

// Create user profile
export const createProfile = async (id) => {
  return await axios({
    method: "post",
    url: newUserProfile,
    data: {
      docs: [
        {
          user: id,
        },
      ],
    },
  });
};

// Update user profile
export const updateProfile = async (id, rev, fname, lname, gender) =>
  new Promise().resolve({ id, rev, password, fname, lname, gender });

// Delete user
export const deleteUser = async (id, rev) => new Promise().resolve({ id, rev });
