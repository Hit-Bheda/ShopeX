import { Router, Request, Response, RequestHandler } from "express";
import { Route } from "../../../../types/types";
import { sendProducts, sendSingleProduct } from "../../controllers/products.controller";
import TryCatch from "../../../../utils/try-catch.util";
import UserVerifier from "../../middlewares/user-verifier.middleware";

const AdminRouter = Router();

const privateRoutes: Route[] = [
  {
    path: "/products",
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
  AdminRouter[method](route.path, UserVerifier, TryCatch(handler));
});

export default AdminRouter;


