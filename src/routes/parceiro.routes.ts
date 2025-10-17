import { Request, Response, Router } from "express";
import express from "express";
import { create, listAll, update, getById, getByUsuarioId} from "../controllers/parceiro.controller";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";
import { createParceiroComPonto} from "../controllers/parceiro.controller";

const router = express.Router();


/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint para GET /
 *     tags:
 *       - Parceiro
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.get("/", async (req: Request, res: Response) => {
    const parceiros = await listAll();
    res.json({ parceiros });
});

// router.use(AuthorizeMiddleware);
/**
 * @swagger
 * /usuario/:idUsuario:
 *   get:
 *     summary: Endpoint para GET /usuario/:idUsuario
 *     tags:
 *       - Parceiro
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.get("/usuario/:idUsuario", async (req: Request, res: Response) => {
  const idUsuario = Number(req.params.idUsuario);
  const parceiro = await getByUsuarioId(idUsuario);

  if (!parceiro) {
     res.status(404).json({ message: "Parceiro não encontrado" });
  }

   res.status(200).json(parceiro);
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Endpoint para POST /
 *     tags:
 *       - Parceiro
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
 * /cadastrar-com-ponto:
 *   post:
 *     summary: Endpoint para POST /cadastrar-com-ponto
 *     tags:
 *       - Parceiro
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.post("/cadastrar-com-ponto", createParceiroComPonto);

/**
 * @swagger
 * /:id:
 *   put:
 *     summary: Endpoint para PUT /:id
 *     tags:
 *       - Parceiro
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
