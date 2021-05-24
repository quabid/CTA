import * as db from "../db/index.js";
import { stringify } from "../custom_modules/index.js";

export const listAllDbs = (dbUrl, done) => {
  db.listAllDbsTest((err, data) => {
    if (err) {
      return done(err);
    } else {
      return done(null, data);
    }
  });
};

export const getAllUsers = (done) => {
  db.listAllUsers((err, data) => {
    if (err) {
      return done(err);
    } else {
      return done(null, data);
    }
  });
};

export const listActiveTasks = (dbUrl, done) => {
  db.listActiveTasksTest((err, data) => {
    if (err) {
      return done(err);
    } else {
      return done(null, data);
    }
  });
};

export const clusterStatus = (dbUrl, done) => {
  db.clusterStatusTest((err, data) => {
    if (err) {
      return done(err);
    } else {
      return done(null, data);
    }
  });
};

export const membershipNodes = (dbUrl, done) => {
  db.membershipTest((err, data) => {
    if (err) {
      return done(err);
    } else {
      return done(null, data);
    }
  });
};

export const isServerUp = (dbUrl, done) => {
  db.isServerUp((err, data) => {
    if (err) {
      return done(err);
    } else {
      return done(null, data);
    }
  });
};
