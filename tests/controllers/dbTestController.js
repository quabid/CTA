import request from "request";
import bunyan from "bunyan";
import {
  listAllDbs,
  listActiveTasks,
  clusterStatus,
  membershipNodes,
  isServerUp,
} from "../models/DbTest.js";
import { customAlphabet } from "nanoid";

const logger = bunyan.createLogger({ name: "DB Test Controller" });
const nanoid = customAlphabet(process.env.NANOID_ALPHABET, 18);
const dbUrl = process.env.DB_URL;
const url = dbUrl;
var db = "mytestdatabase/";
var id = `${nanoid()}`;

export const getAllDbs = (req, res) => {
  logger.info(
    `Protocol: ${req.protocol.toUpperCase()}, Method: ${
      req.method
    }, Requested URL: ${req.url}`
  );
  try {
    listAllDbs(url, (err, docs) => {
      if (err) {
        const { status, cause, message } = err;

        logger.error(
          `Function: dbRouteTest, Status: ${status}, Message: ${message}, Cause: ${cause}`
        );

        res.status(404).json({
          status: err.status,
          message: err.message,
          cause: err.cause,
        });
      } else {
        res.status(200).json({ data: docs });
      }
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({
      status: "failure",
      message: err.message,
      cause: err.stackTrace,
    });
  }
};

export const getActiveTasks = (req, res) => {
  logger.info(
    `Protocol: ${req.protocol.toUpperCase()}, Method: ${
      req.method
    }, Requested URL: ${req.url}`
  );
  try {
    listActiveTasks(url, (err, docs) => {
      if (err) {
        const { status, cause, message } = err;

        logger.error(
          `Function: dbRouteTest, Status: ${status}, Message: ${message}, Cause: ${cause}`
        );

        res.status(404).json({
          status: err.status,
          message: err.message,
          cause: err.cause,
        });
      } else {
        res.status(200).json({ data: docs });
      }
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({
      status: "failure",
      message: err.message,
      cause: err.stackTrace,
    });
  }
};

export const getClusterStatus = (req, res) => {
  logger.info(
    `Protocol: ${req.protocol.toUpperCase()}, Method: ${
      req.method
    }, Requested URL: ${req.url}`
  );
  try {
    clusterStatus(url, (err, docs) => {
      if (err) {
        const { status, cause, message } = err;

        logger.error(
          `Function: dbRouteTest, Status: ${status}, Message: ${message}, Cause: ${cause}`
        );

        res.status(404).json({
          status: err.status,
          message: err.message,
          cause: err.cause,
        });
      } else {
        res.status(200).json({ data: docs });
      }
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({
      status: "failure",
      message: err.message,
      cause: err.stackTrace,
    });
  }
};

export const getMemberNodes = (req, res) => {
  logger.info(
    `Protocol: ${req.protocol.toUpperCase()}, Method: ${
      req.method
    }, Requested URL: ${req.url}`
  );
  try {
    membershipNodes(url, (err, docs) => {
      if (err) {
        const { status, cause, message } = err;

        logger.error(
          `Function: dbRouteTest, Status: ${status}, Message: ${message}, Cause: ${cause}`
        );

        res.status(404).json({
          status: err.status,
          message: err.message,
          cause: err.cause,
        });
      } else {
        res.status(200).json({ data: docs });
      }
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({
      status: "failure",
      message: err.message,
      cause: err.stackTrace,
    });
  }
};

export const getServerStatus = (req, res) => {
  logger.info(
    `Protocol: ${req.protocol.toUpperCase()}, Method: ${
      req.method
    }, Requested URL: ${req.url}`
  );
  try {
    isServerUp(url, (err, docs) => {
      if (err) {
        const { status, cause, message } = err;

        logger.error(
          `Function: dbRouteTest, Status: ${status}, Message: ${message}, Cause: ${cause}`
        );

        res.status(404).json({
          status: err.status,
          message: err.message,
          cause: err.cause,
        });
      } else {
        res.status(200).json({ data: docs });
      }
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({
      status: "failure",
      message: err.message,
      cause: err.stackTrace,
    });
  }
};
