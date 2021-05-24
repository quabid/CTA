import { Router } from "express";
import * as DbComments from "../controllers/commentsController.js";

const comments = Router();

comments.route("/submit").post(DbComments.submit);

comments.route("/").get(DbComments.all);

comments.route("/recent").get(DbComments.recent);

export default comments;
