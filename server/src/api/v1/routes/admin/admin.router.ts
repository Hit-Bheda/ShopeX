import { Router, Request, Response, RequestHandler } from "express";
import { Route } from "../../../../types/types";
import TryCatch from "../../../../utils/try-catch.util";
import { createCategory, createProduct, deleteCategory, getCategories, getUser, uploadFile } from "../../controllers/admin/admin.controller";
import AdminVerifier from "../../middlewares/admin-verifier.middleware";
import { upload } from "../../middlewares/multer.middleware";

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
  },{
    path: "/image/upload",
    method: "post",
    handler: uploadFile
  },{
    path: "/create-product",
    method: "post",
    handler: createProduct
  }
];

privateRoutes.forEach((route) => {
  const method = route.method;
  const handler = route.handler as RequestHandler;
  AdminRouter[method](route.path, route.path == "/image/upload" ? [AdminVerifier, upload.single("image")] : AdminVerifier, TryCatch(handler));
});

// AdminRouter.post("/image/upload",[AdminVerifier, upload.single("image")], uploadFile)

export default AdminRouter;