import { Router } from "express";
import * as UT from "../controllers/dbUserTestController.js";

const usertestrouter = Router();

usertestrouter.route("/").get(UT.listAllUsers);

export default usertestrouter;
