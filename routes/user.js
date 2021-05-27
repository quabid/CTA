import { Router } from "express";
import * as UC from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/profile/create").post(UC.createUserProfile);
userRouter.route("/email").post(UC.updateUserEmail);
userRouter.route("/pwd").post(UC.updateUserPassword);
userRouter.route("/profile/update").post(UC.updateUserProfile);

export default userRouter;
