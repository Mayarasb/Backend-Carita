'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable("parceiro",{
   id_parceiro: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      
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
    
    tipoParceiro:{
      allowNull: false, 
          type: DataTypes.STRING(100),
    },
    areaAtuacao:{
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
    await queryInterface.dropTable("parceiro");
  }
};
