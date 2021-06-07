import asyncHandler from "express-async-handler";
import { customAlphabet } from "nanoid";
import bunyan from "bunyan";
import { findUserByEmail, addUser, createProfile } from "../db/index.js";

const logger = bunyan.createLogger({ name: "Todo Controller" });
const nanoid = customAlphabet("0123456789T", 15);

// @desc        Creates a user's todo
// @route       POST /api/todos/add
// @access      Private
export const addTodo = asyncHandler(async (req, res) => {
  logger.info(
    `Export: addTodo, Route: /api/todos/add, Method: POST, Requested URL: ${req.url}`
  );

  const newTodo = {};
  if (req.body.todoStart) {
    newTodo.start = req.body.todoStart;
  }

  if (req.body.todoEnd) {
    newTodo.end = req.body.todoEnd;
  }

  const { title, body } = req.body;
  newTodo.title = title;
  newTodo.body = body;

  res.status(200).json({
    status: "success",
    url: req.url,
    payload: newTodo,
  });
});

// @desc        Get a user's todos
// @route       GET /api/todos
// @access      Private
export const getTodos = asyncHandler(async (req, res) => {
  logger.info(
    `Export: getTodos, Route: /api/todos, Method: GET, Requested URL: ${req.url}`
  );

  res.status(200).json({
    status: "success",
    url: req.url,
  });
});
