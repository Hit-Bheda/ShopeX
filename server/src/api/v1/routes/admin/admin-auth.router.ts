import { RequestHandler, Router } from "express";
import {
	login,
	signup,
} from "../../controllers/admin/admin-auth.controler";
import { Route } from "../../../../types/types";
import TryCatch from "../../../../utils/try-catch.util";
import { accessToken } from "../../controllers/admin/admin-auth.controler";
import { isAuth, logout } from "../../controllers/user/user-auth.controller";

export const AdminAuthRouter = Router();

const routes: Route[] = [
	{
		path: "/login",
		method: "post",
		handler: login,
	},{
        path: "/access-token",
        method: "post",
        handler: accessToken
    },{
        path: "/signup",
        method: "post",
        handler: signup
    },{
        path: "/logout",
        method: "post",
        handler: logout
    },{
        path: "/is-auth",
        method: "post",
        handler: isAuth
    }
];

routes.forEach((route) => {
	const method = route.method;
	const handler = route.handler as RequestHandler;
	AdminAuthRouter[method](route.path, TryCatch(handler));
});

