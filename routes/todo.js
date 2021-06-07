import { Router } from "express";
import * as TC from "../controllers/todoController.js";
import { protect } from "../middleware/AuthMiddleware.js";

const todoRouter = Router();

todoRouter.route("/add").post(protect, TC.addTodo);

todoRouter.route("/").get(protect, TC.getTodos);

export default todoRouter;
