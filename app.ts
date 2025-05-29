import express from "express";
import organizacaoRoutes from "./src/routes/organizacao.routes";
import parceiroRoutes from "./src/routes/parceiro.routes"
import  pontoArrecadacaoRoutes from "./src/routes/pontoArrecadacao.routes"
import usuarioRoutes from "./src/routes/usuario.routers"
import { authRouter } from "./src/routes/auth.routes";

const app = express();

app.use(express.json());

app.use("/organizacao", organizacaoRoutes);
app.use("/parceiros",parceiroRoutes)
app.use("/pontosArrecadacao",pontoArrecadacaoRoutes)
app.use("/usuarios",usuarioRoutes)
app.use("/autenticacao", authRouter)

app.listen(3000, () => {
    console.log("Servidor executando na porta 3000");
});
