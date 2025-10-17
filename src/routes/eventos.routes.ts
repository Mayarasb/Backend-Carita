import { Request, Response } from "express";
import express from "express";
import { create, getById, listAll, update, remove } from "../controllers/evento.controller";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna todos os eventos
 *     tags:
 *       - Evento
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 */
router.get("/", async (req: Request, res: Response) => {
    const eventos = await listAll();
    res.status(200).json(eventos );
});

/**
 * @swagger
 * /:id:
 *   get:
 *     summary: Retorna um evento pelo ID
 *     tags:
 *       - Evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento não encontrado
 */
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const evento = await getById(id);
  if (!evento) {
  res.status(404).json({ message: "Evento não encontrado" });
  }
  res.status(200).json(evento);
});

// As próximas rotas exigem autenticação
//router.use(AuthorizeMiddleware);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Cria um novo evento
 *     tags:
 *       - Evento
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 */
router.post("/", async (req: Request, res: Response) => {
    const evento = await create(req.body);
    res.json(evento);
});

/**
 * @swagger
 * /:id:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags:
 *       - Evento
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 */
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await update(Number(id), req.body);
  res.json(updated);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await remove(Number(id));
  res.json(deleted);
});
export default router;
