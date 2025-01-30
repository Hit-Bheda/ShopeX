import express from "express"
import { AdminAuthRouter } from "./admin-auth.router"
import AdminRouter from "./admin.router"

const Admin = express.Router()

Admin.use("/",AdminRouter)
Admin.use("/auth",AdminAuthRouter)

export default Admin