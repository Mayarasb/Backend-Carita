import { Request, Response, Router } from "express";
import express from "express";
import {
  create,
  getById,
  listAll,
  update,
  getByUsuarioId,
} from "../controllers/organizacao.controller";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });



/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint para GET /
 *     tags:
 *       - Organizacao
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.get("/", async (req: Request, res: Response) => {
  const organizacoes = await listAll();
  res.json({ organizacoes });
});

// router.use(AuthorizeMiddleware);
/**
 * @swagger
 * /usuario/:idUsuario:
 *   get:
 *     summary: Endpoint para GET /usuario/:idUsuario
 *     tags:
 *       - Organizacao
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.get("/usuario/:idUsuario", async (req: Request, res: Response) => {
  const idUsuario = Number(req.params.idUsuario);
  const organizacao = await getByUsuarioId(idUsuario);

  if (!organizacao) {
    res.status(404).json({ message: "Organização não encontrada" });
  }

  res.status(200).json(organizacao);
});

/**
 * @swagger
 * /:id:
 *   get:
 *     summary: Endpoint para GET /:id
 *     tags:
 *       - Organizacao
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const organizacao = await getById(id);

  if (!organizacao) {
    res.status(404).send({ message: "Organização não encontrada" });
  }

  res.status(200).json(organizacao);
});

const uploadFields = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "documento", maxCount: 1 },
  { name: "qrCode", maxCount: 1 },
]);


/**
 * @swagger
 * /:
 *   post:
 *     summary: Endpoint para POST /
 *     tags:
 *       - Organizacao
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.post("/", uploadFields, async (req: Request, res: Response) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  const imagens = {} as any;

  for (const campo in files) {
    const file = files[campo][0];
    imagens[campo] = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
  }

  const org = {
    ...req.body,
    ...imagens
  };

  console.log(">> ", org);

  try {
    console.log(req.body);
    const organizacao = await create(org);
    res.json(organizacao);
  } catch (error) {
    res.json({ error });
  }
});

/**
 * @swagger
 * /:id:
 *   put:
 *     summary: Endpoint para PUT /:id
 *     tags:
 *       - Organizacao
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.put("/:id", uploadFields, async (req: Request, res: Response) => {
  const { id } = req.params;

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  const imagens = {} as any;

  for (const campo in files) {
    const file = files[campo][0];
    imagens[campo] = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  }

  const dadosAtualizados = {
    ...req.body,
    ...imagens
  };

  const updated = await update(Number(id), dadosAtualizados);
  res.json(updated);
});

export default router;
