import { Router } from "express";
import * as TC from "../controllers/todoController.js";

const todoRouter = Router();

todoRouter.route("/add").post(TC.addTodo);

export default todoRouter;
