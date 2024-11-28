import express from "express"
import {login, signup, logout} from "../controller/auth.js"

const authRouter = express.Router()

authRouter.get("/signup",signup)
authRouter.get("/login",login)
authRouter.get("/logout",logout)

export default authRouter;