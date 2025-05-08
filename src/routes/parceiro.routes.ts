import { Request, Response, Router } from "express";
import express from "express";
import { create, listAll, update } from "../controllers/parceiro.controller";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    const parceiros = await listAll();
    res.json({ parceiros });
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
