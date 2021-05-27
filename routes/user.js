import { Router } from "express";
import * as UC from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/register").post(UC.registerUser);

userRouter.route("/list").get(UC.getUsersList);

userRouter.route("/findbyemail").post(UC.getUserByEmail);

userRouter.route("/findbyid").post(UC.getUserById);

userRouter.route("/auth").post(UC.authUser);

export default userRouter;
