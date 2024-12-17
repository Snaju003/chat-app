import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.js";
import connectToDatabase from "./db/db.js";
import messageRouter from "./routes/message.js";
import userRouter from "./routes/user.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

server.listen(
  PORT,
  connectToDatabase(),
  console.log(`server listening on ${PORT}`)
);
