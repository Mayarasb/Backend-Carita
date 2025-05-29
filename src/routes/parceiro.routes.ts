import { Request, Response, Router } from "express";
import express from "express";
import { create, listAll, update, getById} from "../controllers/parceiro.controller";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";

const router = express.Router();
router.use(AuthorizeMiddleware);

router.get("/", async (req: Request, res: Response) => {
    const parceiros = await listAll();
    res.json({ parceiros });
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const parceiro = await getById(id); 
  
    if (!parceiro) {
    res.status(404).send({ message: "Parceiro não encontrado" });
    }
  
    res.status(200).json(parceiro);
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
