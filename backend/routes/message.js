import express from "express";
import { getMessages, sendMessage } from "../controller/message.js";
import { protectRoute } from "../middleware/message.js";

const messageRouter = express.Router();

messageRouter.post("/send/:id", protectRoute, sendMessage);
messageRouter.get("/:id", protectRoute, getMessages);

export default messageRouter;
