'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("eventos",{
      id_evento: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        
      },
      titulo: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      inicio: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      fim:{
        allowNull: false, 
            type: DataTypes.STRING(100),
      },
      descricao:{
        allowNull: false, 
            type: DataTypes.STRING(100),
      },
      endereco:{
        allowNull: false, 
            type: DataTypes.STRING(100),
      },
      id_parceiro: {      
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'parceiro', 
          key: 'id_parceiro'
        },
         onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_organizacao: {      
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'organizacao', 
          key: 'id_organizacao'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("eventos");
  }
};
