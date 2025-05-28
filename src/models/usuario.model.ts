import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

import { Usuario } from "../interfaces/usuario.interface";

type UsuarioCreationalAttributes = Optional<Usuario , "id">

export class UsuarioModel extends Model<Usuario , UsuarioCreationalAttributes> {
  public id!: number;
  public cpf!: string;
  public email!: string;
  public senha!: string;
  public status!: boolean;
}

UsuarioModel.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    field: "id_usuario"//nome do id dentro do migration
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
  status:{
    allowNull: false, 
        field: "status",
        type: DataTypes.BOOLEAN,
  }

},
  {
    sequelize, 
    tableName: 'usuario', 
    modelName: 'Usuarios',  
    timestamps: false,       
  }
);