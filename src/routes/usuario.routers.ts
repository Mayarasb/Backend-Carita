import { Request, Response, Router } from "express";
import express from "express";
import { create, listAll, update, getById, desativar } from "../controllers/usuario.controller";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";
import bcrypt from "bcrypt"
import { UsuarioModel } from "../models/usuario.model"
import { Op } from "sequelize";

const router = express.Router();


/**
 * @swagger
 * /:
 *   post:
 *     summary: Endpoint para POST /
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const usuario = req.body;
    console.log(usuario)

    const existente = await UsuarioModel.findOne({
      where: {
        [Op.or]: [
          { email: usuario.email },
          { cpf: usuario.cpf }
        ]
      }
    });

    console.log("Usuário existente encontrado:", existente);

    if (existente) {
      const duplicado = existente.email === usuario.email ? "E-mail" : "CPF";
      console.log(`Erro de cadastro: ${duplicado} já cadastrado.`);
      res.status(400).json({ message: `${duplicado} já cadastrado.` });
      return;
    }

    const senhaHash = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = senhaHash;

    const novoUsuario = await create(usuario);
    console.log("Novo usuário criado:", novoUsuario);

    // Remover campos antes de enviar para o frontend
    const { senha, status, id, ...usuarioPublico } = novoUsuario;

    res.status(201).json(usuarioPublico);

  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    // res.status(400).json({ message: "Campos obrigatórios ausentes ou inválidos." });
  }
});


// router.use(AuthorizeMiddleware);

/**
 * @swagger
 * /:id:
 *   get:
 *     summary: Endpoint para GET /:id
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.get("/:id", AuthorizeMiddleware,async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const usuario = await getById(id);

  if (!usuario) {
    res.status(404).send({ message: "Usuario não encontrado" });
  }

  res.status(200).json(usuario);
})


/**
 * @swagger
 * /:id:
 *   put:
 *     summary: Endpoint para PUT /:id
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.put("/:id", AuthorizeMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await update(Number(id), req.body);
  res.json(updated);
})



/**
 * @swagger
 * /:id/desativar:
 *   post:
 *     summary: Endpoint para POST /:id/desativar
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.post("/:id/desativar",AuthorizeMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const desativado = await desativar(id);

  if (!desativado) {
    res.status(404).json({ message: "Usuário não encontrado ou já desativado." });
    return;
  }

  res.status(200).json({ message: "Conta desativada com sucesso." });
})


/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint para GET /
 *     tags:
 *       - Usuario
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 */
router.get("/", AuthorizeMiddleware,async (req: Request, res: Response) => {
  const usuarios = await listAll();
  res.json({ usuarios });
})


/*router.post("/:id/reativar", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const reativado = await reativar(id);

    if (!reativado) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Conta reativada com sucesso" });
  } catch (error) {
    console.error("Erro ao reativar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
*/
export default router;