import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (id, rev) =>
  jwt.sign({ id: id, rev: rev }, JWT_SECRET, { expiresIn: "30d" });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

export const hashPassword = (password, done) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return done(err, null);
      }
      return done(null, hash);
    });
  });
};

export const comparePassword = (password, hash, done) => {
  bcrypt.compare(password, hash, (err, res) => {
    if (err) {
      done(
        {
          message: err,
        },
        null
      );
    } else {
      done(null, {
        result: res,
      });
    }
  });
};
