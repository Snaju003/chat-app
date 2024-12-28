import express from "express";
import { login, signup, logout, refreshToken } from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refreshtoken", refreshToken);

export default authRouter;
