import { Router, Request, Response, RequestHandler } from "express";
import { Route } from "../../../../types/types";
import TryCatch from "../../../../utils/try-catch.util";
import { createCategory, deleteCategory, getCategories, getUser } from "../../controllers/admin/admin.controller";
import AdminVerifier from "../../middlewares/admin-verifier.middleware";

const AdminRouter = Router();

const privateRoutes: Route[] = [
  {
    path: "/create-category",
    method: "post",
    handler: createCategory,
  },{
    path: "/get-categories",
    method: "post",
    handler: getCategories
  },{
    path: "/delete-category/:id",
    method: "post",
    handler: deleteCategory
  },{
    path: "/get-user",
    method: "post",
    handler: getUser
  }
];

privateRoutes.forEach((route) => {
  const method = route.method;
  const handler = route.handler as RequestHandler;
  AdminRouter[method](route.path, AdminVerifier, TryCatch(handler));
});

export default AdminRouter;


