'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("usuario",{
     id_usuario: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      cpf: {
        allowNull: false,
        field: "cpf",
        type: DataTypes.STRING(100),
      },
      email:{
        allowNull: false, 
            field: "email",
            type: DataTypes.STRING(100),
      },
      senha:{
        allowNull: false, 
            field: "senha",
            type: DataTypes.STRING(100),
      },
   }
  )},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("usuario");
  }
};
