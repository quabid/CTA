import bunyan from "bunyan";
import * as Comments from "../models/Comments.js";
import { customAlphabet } from "nanoid";

const logger = bunyan.createLogger({ name: "DB Comments Controller" });
const nanoid = customAlphabet("1357ICUP!@#$%^&*", 18);
const url = "http://rick:nimda@192.168.1.20:5984/";
const db = "mytestdatabase/";

export const submit = (req, res) => {
  try {
    Comments.submit(req.session.user._id, req, body.comment, (err, doc) => {
      if (!err) {
        res.redirect("/db/comments");
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

export const all = (req, res) => {
  try {
    Comments.all((err, docs) => {
      if (!err) {
        res.status(200).json({ comments: docs });
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

export const recent = (req, res) => {
  try {
    Comments.recent(function (err, docs) {
      res.status(200).json({ comments: docs });
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
