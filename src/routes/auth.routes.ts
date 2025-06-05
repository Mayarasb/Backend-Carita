import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
 
import dotenv from "dotenv";
dotenv.config();

 
export const authRouter = express.Router();

 
authRouter.post("/", (req: Request, res: Response) => {
  const { username, password } = req.body;
 
  if (username === "usuario" && password === "123456") { //mudar esse 
    const secret = process.env.AUTH_SECRET || "";
    const token = jwt.sign({ username: "usuario" }, secret);
    res.status(200).json({ token });
  }
  res.status(401).send();
});
 