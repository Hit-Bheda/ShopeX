import { Router, Request, Response, RequestHandler } from "express";
import { Route } from "../../../types/types";
import {
  getHeroProducts,
  sendProducts,
  sendSingleProduct,
} from "../controllers/products.controller";
import TryCatch from "../../../utils/try-catch.util";

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
  {
    path: "/hero-products",
    method: "get",
    handler: getHeroProducts,
  },
];

privateRoutes.forEach((route) => {
  const method = route.method;
  const handler = route.handler as RequestHandler;
  ProductsRouter[method](route.path, TryCatch(handler));
});

export default ProductsRouter;
