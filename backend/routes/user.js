import express from "express";
import { getSelectedUser, getUsers } from "../controller/user.js";
import { protectRoute } from "../middleware/message.js";

const userRouter = express.Router();

userRouter.get("/",protectRoute, getUsers);
userRouter.get("/:id",protectRoute, getSelectedUser);

export default userRouter;