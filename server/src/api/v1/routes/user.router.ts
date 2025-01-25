import { Router, Request, Response, RequestHandler } from "express";
import { Route } from "../../../types/types";
import { accessToken, forgotPassword } from "../controllers/user.controller";
import TryCatch from "../../../utils/try-catch.util";
import UserVerifier from "../middlewares/user-verifier.middleware";

const UserRouter = Router();

const privateRoutes: Route[] = [
  {
    path: "/forgot-password",
    method: "post",
    handler: forgotPassword,
  },
  {
    path: "/accesstoken",
    method: "post",
    handler: accessToken,
  },
];

privateRoutes.forEach((route) => {
  const method = route.method;
  const handler = route.handler as RequestHandler;
  UserRouter[method](route.path, UserVerifier, TryCatch(handler));
});

export default UserRouter;
