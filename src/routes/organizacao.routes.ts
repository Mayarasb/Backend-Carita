import { Request, Response, Router } from "express";
import express from "express";
import { create, getById, listAll, update, getByUsuarioId } from "../controllers/organizacao.controller";
import { AuthorizeMiddleware } from "../middlewares/authorize.middleware";

const router = express.Router();

//router.use(AuthorizeMiddleware);

router.get("/", async (req: Request, res: Response) => {
    const organizacoes = await listAll();
    res.json({ organizacoes });
});

router.get('/usuario/:idUsuario', async (req: Request, res: Response) => {
  const idUsuario = Number(req.params.idUsuario);
  const organizacao = await getByUsuarioId(idUsuario);

  if (!organizacao) {
    res.status(404).json({ message: 'Organização não encontrada' });
  }

   res.status(200).json(organizacao);
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
    try {
        console.log(req.body);
        const organizacao = await create(req.body);
        res.json(organizacao);
        
    } catch (error) {
        res.json({error})
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await update(Number(id), req.body);
    res.json(updated);
});




export default router;
