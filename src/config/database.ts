import { Sequelize } from "sequelize";

const sequelize = new Sequelize ({
    dialect: "sqlite",

    // storage: "./database.db", Atualizar o caminho do banco de dados
    storage: "./database.db",

    logging: true,
});

export default sequelize;