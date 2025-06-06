'use strict';
const {DataTypes} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("organizacao",{
      id_organizacao:{
        primaryKey: true,
        allowNull: false, //nao permite nulos
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      nome: {
          allowNull: false,
          type: DataTypes.STRING(100),
        },
        cnpj: {
          allowNull: false,
          type: DataTypes.STRING(100),
        },
        telefone:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        email:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        logradouro:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        numero:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        bairro:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        cidade:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        estado:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        cep:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        numeroPix:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        site:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        tipoInstituicao:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        anoFundacao:{
          allowNull: false, 
              type: DataTypes.INTEGER,
        },
        areaAtuacao:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        descricaoInstituicao:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        logo:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        documento:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        qrCode:{
          allowNull: false, 
              type: DataTypes.STRING(100),
        },
        idUsuario: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'usuario', 
          key: 'id_usuario'         
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("organizacao");
  }
};
