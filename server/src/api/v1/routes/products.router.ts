import { Router, Request, Response, RequestHandler } from "express";
import { Route } from "../../../types/types";
import {
  sendProducts,
  sendSingleProduct,
} from "../controllers/products.controller";
import TryCatch from "../../../utils/try-catch.util";
import UserVerifier from "../middlewares/user-verifier.middleware";

const ProductsRouter = Router();

const privateRoutes: Route[] = [
  {
    path: "/",
    method: "get",
    handler: sendProducts,
  },
  {
    path: "/products/:id",
    method: "get",
    handler: sendSingleProduct,
  },
];

privateRoutes.forEach((route) => {
  const method = route.method;
  const handler = route.handler as RequestHandler;
  ProductsRouter[method](route.path, TryCatch(handler));
});

export default ProductsRouter;
