// src/server.ts
import express from 'express';
import cors from 'cors';
import organizacaoRoutes from "./routes/organizacao.routes";
import parceiroRoutes from "./routes/parceiro.routes"
import  pontoArrecadacaoRoutes from "./routes/pontoArrecadacao.routes"
import usuarioRoutes from "./routes/usuario.routers"
import { authRouter } from "./routes/auth.routes";
import { AuthorizeMiddleware } from './middlewares/authorize.middleware';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initSocket, broadcastBanner, broadcastMetrics } from './realtime/socket';

dotenv.config();

const app = express();
import swaggerUi from 'swagger-ui-express';
const swaggerFile = require('./swagger-output.json');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(bodyParser.json());

// ==== MÉTRICAS EM MEMÓRIA (exemplo simples) ====
let familiasAjudadas = 0;

// Endpoint para atualizar métricas (p. ex., ao registrar nova doação)
app.post('/admin/metrics/familias', (req, res) => {
  // Ex.: { delta: 3 } ou { total: 120 }
  const { delta, total } = req.body as { delta?: number; total?: number };
  if (typeof total === 'number') familiasAjudadas = Math.max(0, total);
  if (typeof delta === 'number') familiasAjudadas = Math.max(0, familiasAjudadas + delta);

  // Emite atualização em tempo real
  broadcastMetrics({ familiasAjudadas });
  res.json({ ok: true, familiasAjudadas });
});

app.use("/organizacoes", AuthorizeMiddleware, organizacaoRoutes);
app.use("/parceiros",AuthorizeMiddleware,parceiroRoutes)
app.use("/pontosArrecadacao",AuthorizeMiddleware,pontoArrecadacaoRoutes)
app.use("/usuarios",usuarioRoutes)
app.use("/autenticacao", authRouter)

//mudou isso aqui 
  if (!socketId || !channel) {
    res.status(400).json({ error: 'socket_id e channel_name são obrigatórios' });
    return;
  }

// Endpoint para disparar um banner público
app.post('/admin/helper/banner', (req, res) => {
  const { message } = req.body as { message: string };
  if (!message) res.status(400).json({ error: 'message é obrigatório' });
  broadcastBanner(message);
  res.json({ ok: true });
  return;
});

// (Opcional) Endpoint para obter o número atual no load da página
app.get('/public/metrics', (req, res) => {
  res.json({ familiasAjudadas });
});

const PORT = process.env.PORT || 3000;
const server = initSocket(app);
server.listen(PORT, () => {
  console.log(`HTTP + Socket.IO em http://localhost:${PORT}`);
});
