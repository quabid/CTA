import request from "request";
import querystring from "querystring";

const url = process.env.ALL_USERS;

export const listAllUsers = (done) => {
  request(
    {
      url: url,
      json: true,
    },
    (err, res, body) => {
      if (err) {
        return done(
          {
            status: "failed",
            message: "Unable to get all users",
            cause: err,
          },
          null
        );
      } else {
        return done(null, body);
      }
    }
  );
};
