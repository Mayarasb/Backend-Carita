// src/server.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initSocket, broadcastBanner, broadcastMetrics } from './realtime/socket';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
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
