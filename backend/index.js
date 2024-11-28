import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import connectToDatabase from "./db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(
  PORT,
  console.log(`server listening on ${PORT}`),
  connectToDatabase()
);
