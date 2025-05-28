import { Request, Response, Router } from "express";
import express from "express";
import { create, listAll, update, getById, desativar  } from "../controllers/usuario.controller";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    const usuarios = await listAll();
    res.json({ usuarios });
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const usuario = await getById(id); 
  
    if (!usuario) {
    res.status(404).send({ message: "Usuario não encontrado" });
    }
  
    res.status(200).json(usuario);
  });

router.post("/", async (req: Request, res: Response) => {
    const usuario = await create(req.body);
    res.json(usuario);
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await update(Number(id), req.body);
    res.json(updated);
});

router.post("/:id/desativar", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const desativado = await desativar(id);

  if (!desativado) {
    res.status(404).json({ message: "Usuário não encontrado ou já desativado." });
    return;
  }

  res.status(200).json({ message: "Conta desativada com sucesso." });
});
export default router;
