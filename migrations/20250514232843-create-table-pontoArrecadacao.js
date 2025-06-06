'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable("pontoArrecadacao",{
    id_pontoArrecadacao: {
       primaryKey: true,
       type: DataTypes.INTEGER,
       autoIncrement: true,
       allowNull: false,
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
     horario:{
       allowNull: false, 
           type: DataTypes.STRING(100),
     },
       idParceiro: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'parceiro', 
          key: 'id_parceiro'         
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
  })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("pontoArrecadacao");
  }
};
