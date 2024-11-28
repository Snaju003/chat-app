import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
import connectToDatabase from "./db/db.js";
import messageRouter from "./routes/message.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(
  PORT,
  console.log(`server listening on ${PORT}`),
  connectToDatabase()
);
