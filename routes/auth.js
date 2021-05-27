import { Router } from "express";
import * as AC from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/register").post(AC.registerUser);
authRouter.route("/signin").post(AC.authUser);

export default authRouter;
