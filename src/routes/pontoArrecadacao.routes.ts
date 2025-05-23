import { Request, Response, Router } from "express";
import express from "express";
import { create, listAll, update, getById } from "../controllers/pontoArrecadacao.controller";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    const pontosArrecadacao = await listAll();
    res.json({ pontosArrecadacao });
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pontoArrecadacao = await getById(id); 
  
    if (!pontoArrecadacao) {
    res.status(404).send({ message: "Ponto de arrecadação não encontrada" });
    }
  
    res.status(200).json(pontoArrecadacao);
  });

router.post("/", async (req: Request, res: Response) => {
    const parceiro = await create(req.body);
    res.json(parceiro);
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await update(Number(id), req.body);
    res.json(updated);
});

export default router;
