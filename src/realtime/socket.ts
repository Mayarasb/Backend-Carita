// src/realtime/socket.ts
import { createServer, Server as HTTPServer } from 'http';
import type { Express } from 'express';
import { Server } from 'socket.io';

let io: Server | undefined;

export function initSocket(app: Express): HTTPServer {
  const httpServer = createServer(app);

  io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:4200'], // ajuste para seu front em prod
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    // Todas conexões entram numa sala pública
    socket.join('public');

    // cliente pode pedir para entrar em outra sala temática se quiser (opcional)
    socket.on('helper:join', (room: string) => {
      if (room) socket.join(room);
    });
  });

  return httpServer;
}

export function getIO(): Server {
  if (!io) throw new Error('Socket.io não inicializado.');
  return io;
}

// Helpers de envio
export function broadcastBanner(message: string) {
  getIO().to('public').emit('helper:banner', { message, at: new Date().toISOString() });
}

export function broadcastMetrics(metrics: { familiasAjudadas: number }) {
  getIO().to('public').emit('helper:metrics', { ...metrics, at: new Date().toISOString() });
}
