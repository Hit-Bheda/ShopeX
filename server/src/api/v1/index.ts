import express, { Request, Response } from "express";
import AuthRouter from "./routes/auth.router";
import UserRouter from "./routes/user.router";

const v1 = express.Router();

v1.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "This Is V1 API! ☠️",
  });
});

v1.use("/auth", AuthRouter);
v1.use("/user", UserRouter);

export default v1;
