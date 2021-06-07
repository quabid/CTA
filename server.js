import express from "express";
import { customAlphabet } from "nanoid";
import landing from "./routes/landing.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import dbroutertest from "./tests/routes/dbtest.js";
import usertestrouter from "./tests/routes/dbuserstest.js";
import { errorHandler, notFound } from "./middleware/ErrorMiddleware.js";
import { successMessage } from "./custom_modules/index.js";

const PORT = process.env.PORT || 4000;
const nanoid = customAlphabet("024698ouqtyminv*^#%`~[;>|\\", 13);
const server = express();

server.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache,no-store,max-age=0,must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "-1");
  res.setHeader("X-XSS-Protection", "1;mode=block");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("keep-alive", "-1");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Content-Security-Policy", "script-src 'self'");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("x-powered-by", "Deez Nuts");
  res.setHeader("ETag", `${nanoid()}`);
  next();
});

// Body parser
server.use(express.json());

// Routers
server.use("/", landing);
server.use("/auth", authRouter);
server.use("/admin", adminRouter);
server.use("/user", userRouter);
server.use("/api/todos", todoRouter);
server.use("/user/test", usertestrouter);
server.use("/test", dbroutertest);

server.use(notFound);
server.use(errorHandler);

server.listen(PORT, () => {
  console.clear();
  successMessage(`\n\tApp listening on port ${PORT}\n`);
});
