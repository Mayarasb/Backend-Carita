import { Request, Response, Router } from "express";
import express from "express";
import { create, listAll, update, getById } from "../controllers/pontoArrecadacao.controller";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";

const router = express.Router();



/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint para GET /
 *     tags:
 *       - Pontoarrecadacao
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.get("/", async (req: Request, res: Response) => {
    const pontosArrecadacao = await listAll();
    res.json({ pontosArrecadacao });
});

/**
 * @swagger
 * /:id:
 *   get:
 *     summary: Endpoint para GET /:id
 *     tags:
 *       - Pontoarrecadacao
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.get("/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pontoArrecadacao = await getById(id); 
  
    if (!pontoArrecadacao) {
    res.status(404).send({ message: "Ponto de arrecadação não encontrada" });
    }
  
    res.status(200).json(pontoArrecadacao);
  });
// router.use(AuthorizeMiddleware);
  /**
 * @swagger
 * /:
 *   post:
 *     summary: Endpoint para POST /
 *     tags:
 *       - Pontoarrecadacao
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.post("/", async (req: Request, res: Response) => {
    const parceiro = await create(req.body);
    res.json(parceiro);
});

/**
 * @swagger
 * /:id:
 *   put:
 *     summary: Endpoint para PUT /:id
 *     tags:
 *       - Pontoarrecadacao
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await update(Number(id), req.body);
    res.json(updated);
});

export default router;
