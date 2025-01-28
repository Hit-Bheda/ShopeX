import express, { Request, Response } from "express";
import AuthRouter from "./routes/auth.router";
import ProductsRouter from "./routes/products.router";

const v1 = express.Router();

v1.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "This Is V1 API! ☠️",
  });
});

v1.use("/auth", AuthRouter);
v1.use("/products", ProductsRouter);

export default v1;
