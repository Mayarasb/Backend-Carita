import { Usuario } from './../interfaces/usuario.interface';
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from"bcrypt"
import dotenv from "dotenv";
import { getByEmail } from "../controllers/usuario.controller";
dotenv.config();

export const authRouter = express.Router();
 
authRouter.post("/", async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  

  let usuario = await getByEmail(email)// achar no banco
  if(!usuario){
    res.status(401).json("E-mail ou senha inválidos")
    return
  }


  if(!await bcrypt.compare(senha, usuario.senha)){
    res.status(401).json("E-mail ou senha inválidos")
    return
  }
  const secret = process.env.AUTH_SECRET || "";
  const token = jwt.sign({ email: usuario.email, id: usuario.id }, secret);
  res.status(200).json({ token, id: usuario.id });
  

});