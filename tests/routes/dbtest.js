import { Router } from "express";
import * as DBTEST from "../controllers/dbTestController.js";

const dbroutertest = Router();

dbroutertest.route("/").get(DBTEST.getAllDbs);

dbroutertest.route("/tasks").get(DBTEST.getActiveTasks);

dbroutertest.route("/cluster").get(DBTEST.getClusterStatus);

dbroutertest.route("/membership").get(DBTEST.getMemberNodes);

dbroutertest.route("/server-status").get(DBTEST.getServerStatus);

export default dbroutertest;
