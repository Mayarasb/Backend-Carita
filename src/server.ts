import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
// import Pusher from 'pusher';
import cors from 'cors';

const app = express();

// 🔑 Habilita CORS para o frontend Angular
app.use(cors({
  origin: 'http://localhost:4200', // endereço do seu Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// Configuração do Pusher
// const pusher = new Pusher({
//   appId: '2048004',
//   key: '3e86810c679b6be41725',
//   secret: '7c60233f01df4105c29d',
//   cluster: 'mt1',
//   useTLS: true
// });

// Endpoint para enviar notificação
// app.post('/send-reminder', (req: Request, res: Response) => {
//   const { titulo, mensagem } = req.body;

//   const reminderData = {
//     titulo: titulo || 'Lembrete de Doação',
//     mensagem: mensagem || 'Já fez sua doação hoje? ❤️'
//   };

//   pusher.trigger('private-lembretes-channel', 'nova-notificacao', reminderData)
//     .then(() => res.status(200).json({ success: true }))
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ success: false, error });
//     });
// });

// Endpoint para autenticação de canais privados/presence
// app.post('/pusher/auth', (req: Request, res: Response) => {
//   console.log('Auth request:', req.body); // 🔑 Verificar dados recebidos
//   const socketId = req.body.socket_id;
//   const channel = req.body.channel_name;

//   if (!socketId || !channel) {
//     return res.status(400).json({ error: 'socket_id e channel_name são obrigatórios' });
//   }

//   const auth = pusher.authenticate(socketId, channel);
//   res.send(auth);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
