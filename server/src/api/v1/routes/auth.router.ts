import { RequestHandler, Router } from "express";
import {
  login,
  signup,
  logout,
  isAuth,
} from "../controllers/auth.controller";
import { Route } from "../../../types/types";
import TryCatch from "../../../utils/try-catch.util";

const AuthRouter = Router();

const routes: Route[] = [
  {
    path: "/login",
    method: "post",
    handler: login,
  },
  {
    path: "/signup",
    method: "post",
    handler: signup,
  },
  {
    path: "/logout",
    method: "post",
    handler: logout,
  },
  {
    path: "/is-auth",
    method: "post",
    handler: isAuth,
  },
];

routes.forEach((route) => {
  const method = route.method;
  const handler = route.handler as RequestHandler;
  AuthRouter[method](route.path, TryCatch(handler));
});

export default AuthRouter;
