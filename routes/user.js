import { Router } from "express";
import * as UC from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/pwd").post(UC.updateUserPassword);
userRouter.route("/email").post(UC.updateUserEmail);
userRouter.route("/profile/update").post(UC.updateUserProfile);
userRouter.route("/profile/create").post(UC.createUserProfile);

export default userRouter;
