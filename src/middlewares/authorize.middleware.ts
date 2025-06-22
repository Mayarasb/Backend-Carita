import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
 
import dotenv from "dotenv";
dotenv.config();
 
export const AuthorizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { authorization } = req.headers;
  const secret = process.env.AUTH_SECRET || "";
 
  if (authorization && authorization.startsWith("Bearer ")) {
    authorization = authorization.split(' ')[1];
  }

  jwt.verify(authorization || "", secret, (err) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  });
 
  console.log(">> ", authorization);
};
 