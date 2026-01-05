
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import userRouter from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

/* ENV */
config({ path: "./config/config.env" });

const app = express();

/* BODY PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* CORS */
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL,
    ],
    credentials: true,
  })
);

/* COOKIES + FILE UPLOAD */
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

/* ROUTES */
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

/* ERROR HANDLER */
app.use(errorMiddleware);

export default app;
