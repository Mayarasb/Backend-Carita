import { Sequelize } from "sequelize";

const sequelize = new Sequelize ({
    dialect: "sqlite",
    // storage: "./database.sqlite", Atualizar o caminho do banco de dados
    storage: "./src/config/database.sqlite",
    logging: true,
});

export default sequelize;