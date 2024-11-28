import express from "express";
import { sendMessage } from "../controller/message.js";
import { protectRoute } from "../middleware/message.js";

const messageRouter = express.Router();

messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
