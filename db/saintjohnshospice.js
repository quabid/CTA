import request from "request";
import { stringify, objectKeysCount } from "../custom_modules/index.js";
const url = process.env.ALL_USERS;

// Get All Users
export const getAllUsers = (done) => {
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
            message: "Unable to get all users list",
            cause: err,
          },
          null
        );
      } else {
        return done(null, {
          status: "success",
          data: body,
          size: objectKeysCount(body),
        });
      }
    }
  );
};
