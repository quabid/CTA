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

// @desc        Delete a user's todo
// @route       POST /api/todos/remove
// @access      Private
export const removeTodo = asyncHandler(async (req, res) => {
  logger.info(
    `Export: removeTodo, Route: /api/todos/remove, Method: POST, Requested URL: ${req.url}`
  );

  res.status(200).json({
    status: "success",
    url: req.url,
  });
});

// @desc        Get a user's single todo
// @route       POST /api/todos/id
// @access      Private
export const getTodo = asyncHandler(async (req, res) => {
  logger.info(
    `Export: getTodo, Route: /api/todos/id, Method: GET, Requested URL: ${req.url}`
  );

  const tid = req.params.tid;

  res.status(200).json({
    status: "success",
    url: req.url,
    todoId: tid,
  });
});

// @desc        Get a author's todos
// @route       GET /api/todos/author
// @access      Private
export const getTodos = asyncHandler(async (req, res) => {
  logger.info(
    `Export: getTodos, Route: /api/todos/author, Method: GET, Requested URL: ${req.url}`
  );

  const author = req.params.author;

  res.status(200).json({
    status: "success",
    url: req.url,
    author: author,
  });
});

// @desc        Update a user's todo
// @route       POST /api/todos/update
// @access      Private
export const updateTodo = asyncHandler(async (req, res) => {
  logger.info(
    `Export: updateTodo, Route: /api/todos/update, Method: POST, Requested URL: ${req.url}`
  );

  const oldTodo = {};
  if (req.body.todoId) {
    oldTodo.todoId = req.body.todoId;
  }

  if (req.body.todoRev) {
    oldTodo.todoRev = req.body.todoRev;
  }

  if (req.body.todoAuthor) {
    oldTodo.todoAuthor = req.body.todoAuthor;
  }

  if (req.body.todoStart) {
    oldTodo.start = req.body.todoStart;
  }

  if (req.body.todoEnd) {
    oldTodo.end = req.body.todoEnd;
  }

  if (req.body.title) {
    oldTodo.title = req.body.title;
  }

  if (req.body.body) {
    oldTodo.body = req.body.body;
  }

  res.status(200).json({
    status: "success",
    url: req.url,
    payload: oldTodo,
  });
});
