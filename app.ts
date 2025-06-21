import express from "express";
import organizacaoRoutes from "./src/routes/organizacao.routes";
import parceiroRoutes from "./src/routes/parceiro.routes"
import  pontoArrecadacaoRoutes from "./src/routes/pontoArrecadacao.routes"
import usuarioRoutes from "./src/routes/usuario.routers"
import { authRouter } from "./src/routes/auth.routes";

import cors from "cors";


const app = express();
import swaggerUi from 'swagger-ui-express';
const swaggerFile = require('./swagger-output.json');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors())
app.use(express.json());

app.use("/organizacoes", organizacaoRoutes);
app.use("/parceiros",parceiroRoutes)
app.use("/pontosArrecadacao",pontoArrecadacaoRoutes)
app.use("/usuarios",usuarioRoutes)
app.use("/autenticacao", authRouter)



app.listen(3000, () => {
    console.log("Servidor executando na porta 3000");
});
