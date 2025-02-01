import { RequestHandler, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface loginHandler {}
export interface Route {
  path: string;
  method: "get" | "post" | "put" | "delete";
  handler: RequestHandler;
}

export interface UserType {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
}
export interface UserTypeWithoutId extends Omit<UserType, "_id"> {}

export interface AuthRegisterBody extends UserTypeWithoutId {}

export type ControllerMethodReturn = Response | void;

export interface MessageResponse {
  message: string;
  data: Object;
}

export type SignUpReturn = MessageResponse;

export interface PayloadType {
  id: string;
  iat: number;
}

export type decodeType = {
  id: string
}