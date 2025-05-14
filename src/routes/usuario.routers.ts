import { Request, Response, Router } from "express";
import express from "express";
import { create, listAll, update } from "../controllers/usuario.controller";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    const usuarios = await listAll();
    res.json({ usuarios });
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

export default router;
