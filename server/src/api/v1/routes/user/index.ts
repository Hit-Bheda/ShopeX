import express from "express"
import { UserAuthRouter } from "./user-auth.router"
import UserRouter from "./user.router"

const User = express.Router()

User.use("/",UserRouter)
User.use("/auth",UserAuthRouter)

export default User