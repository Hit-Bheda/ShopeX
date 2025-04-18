import { Router, Request, Response, RequestHandler } from "express";
import { Route } from "../../../types/types";
import {
  getCartProducts,
  getHeroProducts,
  getHomeCategory,
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
    path: "/hero-products",
    method: "get",
    handler: getHeroProducts,
  },
  {
    path: "/home-category",
    method: "get",
    handler: getHomeCategory,
  },
  {
    path: "/get-cart-products",
    method: "post",
    handler: getCartProducts,
  },
  {
    path: "/:id",
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
