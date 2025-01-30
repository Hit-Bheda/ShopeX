import express, { Request, Response } from "express";
import ProductsRouter from "./routes/products.router";
import User from "./routes/user";
import Admin from "./routes/admin";

const v1 = express.Router();

v1.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "This Is V1 API! ☠️",
  });
});

v1.use("/user", User);
v1.use("/admin",Admin)
v1.use("/products", ProductsRouter);

export default v1;
