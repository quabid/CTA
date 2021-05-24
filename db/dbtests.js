import request from "request";
import querystring from "querystring";

const url = process.env.DB_SERVER;
const sjhDb = process.env.DB_URL;

export const listAllDbsTest = (done) => {
  request(
    {
      url: url + "/_all_dbs",
      json: true,
    },
    function (err, res, body) {
      if (err)
        return done(
          {
            status: "failed",
            message: "Unable to connect to CouchDB",
            cause: err,
          },
          null
        );
      done(null, body);
    }
  );
};

export const listActiveTasksTest = (done) => {
  request(
    {
      url: url + "/_active_tasks",
      json: true,
    },
    function (err, res, body) {
      if (err)
        return done(
          {
            status: "failed",
            message: "Unable to connect to CouchDB",
            cause: err,
          },
          null
        );
      done(null, body);
    }
  );
};

export const clusterStatusTest = (done) => {
  request(
    {
      url: url + "/_cluster_setup",
      json: true,
    },
    function (err, res, body) {
      if (err)
        return done(
          {
            status: "failed",
            message: "Unable to connect to CouchDB",
            cause: err,
          },
          null
        );
      done(null, body);
    }
  );
};

export const membershipTest = (done) => {
  request(
    {
      url: url + "/_membership",
      json: true,
    },
    function (err, res, body) {
      if (err)
        return done(
          {
            status: "failed",
            message: "Unable to connect to CouchDB",
            cause: err,
          },
          null
        );
      done(null, body);
    }
  );
};

export const isServerUpTest = (done) => {
  request(
    {
      url: url + "/_up",
      json: true,
    },
    function (err, res, body) {
      if (err)
        return done(
          {
            status: "failed",
            message: "Unable to connect to CouchDB",
            cause: err,
          },
          null
        );
      done(null, body);
    }
  );
};
