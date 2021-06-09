import asyncHandler from 'express-async-handler';
import { customAlphabet } from 'nanoid';
import bunyan from 'bunyan';
import {
	findUserByEmail,
	addUser,
	createProfile,
	listTodos,
	createTodo,
	getTodo,
	deleteTodo,
	updateTodo
} from '../db/index.js';

const logger = bunyan.createLogger({ name: 'Todo Controller' });
const nanoid = customAlphabet('0123456789T', 15);

// @desc        Creates todo
// @route       POST /api/todos/add
// @access      Private
export const addTodo = asyncHandler(async (req, res) => {
	logger.info(`Export: addTodo, Route: /api/todos/add, Method: POST, Requested URL: ${req.url}`);

	console.log(`\n\tReceived new todo data: ${JSON.stringify(req.body)}\n`);

	const newTodo = {};

	if (req.body.payload) {
		if (req.body.payload.startdate) {
			newTodo.start = req.body.payload.startdate;
		}

		if (req.body.payload.enddate) {
			newTodo.end = req.body.payload.enddate;
		}

		const { payload: { title, body } } = req.body;

		newTodo.title = title;
		newTodo.body = body;
		newTodo.author = req.user._id;
	} else {
		if (req.body.startdate) {
			newTodo.startdate = req.body.startdate;
		}

		if (req.body.enddate) {
			newTodo.enddate = req.body.enddate;
		}

		const { title, body } = req.body;
		newTodo.title = title;
		newTodo.body = body;
		newTodo.author = req.user._id;
	}

	createTodo(newTodo)
		.then((data) => {
			console.log(data.data);
			res.status(200).json({
				status: 'success',
				data: data.data
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(418).json({
				status: 'failed',
				message: err.message,
				cause: 'Could not create the todo document'
			});
		});

	/*   res.status(200).json({
    status: "success",
    url: req.url,
    payload: newTodo,
    userId: req.user._id,
  }); */
});

// @desc        Delete todo
// @route       POST /api/todos/remove
// @access      Private
export const removeTodo = asyncHandler(async (req, res) => {
	logger.info(`Export: removeTodo, Route: /api/todos/remove, Method: POST, Requested URL: ${req.url}`);

	const { tid, rev } = req.body;

	deleteTodo(tid, rev)
		.then((data) => {
			console.log(data);
			res.status(200).json({
				status: 'success',
				url: req.url
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(200).json({
				status: 'failed',
				url: req.url,
				cause: err
			});
		});
});

// @desc        Get todo
// @route       POST /api/todos/id
// @access      Private
export const getSingleTodo = asyncHandler(async (req, res) => {
	logger.info(`Export: getTodo, Route: /api/todos/id, Method: GET, Requested URL: ${req.url}`);

	const { tid } = req.body;

	getTodo(tid)
		.then((data) => {
			console.log(data.data);
			res.status(200).json({
				status: 'success',
				url: req.url,
				todoId: tid,
				data: data.data
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({
				status: 'failed',
				url: req.url,
				todoId: tid,
				cause: err
			});
		});
});

// @desc        List todos
// @route       GET /api/todos/author
// @access      Private
export const getTodos = asyncHandler(async (req, res) => {
	logger.info(`Export: getTodos, Route: /api/todos/author, Method: GET, Requested URL: ${req.url}`);

	const author = req.params.author;

	listTodos(author)
		.then((data) => {
			res.status(200).json({
				status: 'success',
				url: req.url,
				author: author,
				data: data.data.docs,
				userId: req.user._id
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({
				status: 'failed',
				url: req.url,
				author: author,
				error: err
			});
		});
});

// @desc        Update todo
// @route       POST /api/todos/update
// @access      Private
export const updateTodoDocument = asyncHandler(async (req, res) => {
	logger.info(`Export: updateTodo, Route: /api/todos/update, Method: POST, Requested URL: ${req.url}`);

	const { rev, tid } = req.body;
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

	if (req.body.startdate) {
		oldTodo.startdate = req.body.startdate;
	}

	if (req.body.enddate) {
		oldTodo.enddate = req.body.enddate;
	}

	if (req.body.title) {
		oldTodo.title = req.body.title;
	}

	if (req.body.body) {
		oldTodo.body = req.body.body;
	}

	oldTodo._rev = rev;

	updateTodo(oldTodo, tid)
		.then((data) => {
			res.status(200).json({
				status: 'success',
				url: req.url,
				payload: data
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(401).json({
				status: 'failed',
				url: req.url,
				cause: err.stack
			});
		});
});
