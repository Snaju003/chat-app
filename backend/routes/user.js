import express from "express";
import { getUsers } from "../controller/user.js";
import { protectRoute } from "../middleware/message.js";

const userRouter = express.Router();

userRouter.get("/",protectRoute, getUsers);

export default userRouter;