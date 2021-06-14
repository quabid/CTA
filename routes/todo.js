import { Router } from 'express';
import * as TC from '../controllers/todoController.js';
import { protect } from '../middleware/AuthMiddleware.js';

const todoRouter = Router();

todoRouter.route('/add').post(protect, TC.addTodo);

todoRouter.route('/remove').post(protect, TC.removeTodo);

todoRouter.route('/update').post(protect, TC.updateTodoDocument);

todoRouter.route('/').get(protect, TC.getTodos);

todoRouter.route('/todo').post(protect, TC.getSingleTodo);

export default todoRouter;
