import { Request, Response, Router } from "express";
import express from "express";
import { create, getById, listAll, update } from "../controllers/organizacao.controller";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";

const router = express.Router();

router.use(AuthorizeMiddleware);

router.get("/", async (req: Request, res: Response) => {
    const organizacoes = await listAll();
    res.json({ organizacoes });
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const organizacao = await getById(id); 
  
    if (!organizacao) {
    res.status(404).send({ message: "Organização não encontrada" });
    }
  
    res.status(200).json(organizacao);
  });

router.post("/", async (req: Request, res: Response) => {
    const organizacao = await create(req.body);
    res.json(organizacao);
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await update(Number(id), req.body);
    res.json(updated);
});

export default router;
