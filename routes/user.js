import { Router } from "express";
import * as UC from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/register").post(UC.registerUser);

userRouter.route("/list").get(UC.getUsersList);

userRouter.route("/find").post(UC.getSingleUser);

export default userRouter;
