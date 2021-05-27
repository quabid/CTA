import { Router } from "express";
import * as AC from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.route("/list").get(AC.getUsersList);
adminRouter.route("/findbyemail").post(AC.getUserByEmail);
adminRouter.route("/findbyid").post(AC.getUserById);

export default adminRouter;
