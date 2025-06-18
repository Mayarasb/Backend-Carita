import { Request, Response, Router } from "express";
import express from "express";
import { create, listAll, update, getById, desativar  } from "../controllers/usuario.controller";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";
import bcrypt from"bcrypt"
import {UsuarioModel} from "../models/usuario.model"
import { Op } from "sequelize";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const usuario = req.body;
    console.log(usuario)

    const existente = await UsuarioModel.findOne({
      where: {
        [Op.or]: [
          { email: usuario.email },
          { cpf: usuario.cpf }
        ]
      }
    });

    if (existente) {
      const duplicado = existente.email === usuario.email ? "E-mail" : "CPF";
       res.status(400).json({ message: `${duplicado} já cadastrado.` });
       return
    }

    const senhaHash = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = senhaHash;

    const novoUsuario = await create(usuario);

    // Remover campos antes de enviar para o frontend
    const { senha, status, id, ...usuarioPublico } = novoUsuario;

    res.status(201).json(usuarioPublico);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(400).json({ message: "Campos obrigatórios ausentes ou inválidos." });
  }
});

router.get("/", async (req: Request, res: Response) => {
    const usuarios = await listAll();
    res.json({ usuarios });
})



router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const usuario = await getById(id); 
  
    if (!usuario) {
    res.status(404).send({ message: "Usuario não encontrado" });
    }
  
    res.status(200).json(usuario);
  })
router.use(AuthorizeMiddleware);

router.use(AuthorizeMiddleware);

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await update(Number(id), req.body);
    res.json(updated);
})

router.post("/:id/desativar", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const desativado = await desativar(id);

  if (!desativado) {
    res.status(404).json({ message: "Usuário não encontrado ou já desativado." });
    return;
  }

  res.status(200).json({ message: "Conta desativada com sucesso." });
})

export default router;
