import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

import { Parceiro} from "../interfaces/parceiro.interface";

type ParceiroCreationalAttributes = Optional<Parceiro, "id">

export class ParceiroModel extends Model<Parceiro, ParceiroCreationalAttributes> {
  public id!: number;
  public nome!: string;
  public cnpj!: string;
  public telefone!: string;
  public email!: string;
  public tipoParceiro!: string;
  public areaAtuacao!: string;
  public logo!: string;
  public documento!: string;
  public idUsuario!: number;
}

ParceiroModel.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    field: "id_parceiro"//nome do id dentro do migration
  },
  nome: {
    allowNull: false,
    field: "nome",
    type: DataTypes.STRING(100),
  },
  cnpj: {
    allowNull: false,
    unique: true,
    field: "cnpj",
    type: DataTypes.STRING(100),
  },
  telefone:{
    allowNull: false, 
        field: "telefone",
        type: DataTypes.STRING(100),
  },
  email:{
    allowNull: false, 
        field: "email",
        type: DataTypes.STRING(100),
  },
  
  tipoParceiro:{
    allowNull: false, 
        field: "tipoParceiro",
        type: DataTypes.STRING(100),
  },
  areaAtuacao:{
    allowNull: false, 
        field: "areaAtuacao",
        type: DataTypes.STRING(100),
  },

  logo:{
    allowNull: false, 
        field: "logo",
        type: DataTypes.STRING(100),
  },
  documento:{
    allowNull: false, 
        field: "documento",
        type: DataTypes.STRING(100),
  },
  idUsuario: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'usuario', 
    key: 'id_usuario', 
  },
  field: 'idUsuario', 
}
},
  {
    sequelize, 
    tableName: 'parceiro', 
    modelName: 'Parceiros',  
    timestamps: false,       
  }
);