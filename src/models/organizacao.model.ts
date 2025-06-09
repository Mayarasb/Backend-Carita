import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

import { Organizacao } from "../interfaces/organizacao.interface";

type OrganizacaoCreationalAttributes = Optional<Organizacao, "id">

export class OrganizacaoModel extends Model<Organizacao, OrganizacaoCreationalAttributes> {
  public id!: number;
  public nome!: string;
  public cnpj!: string;
  public telefone!: string;
  public email!: string;
  public logradouro!: string;
  public numero!: string;
  public bairro!: string;
  public cidade!: string;
  public estado!: string;
  public cep!: string;
  public numeroPix!: string;
  public site!: string;
  public tipoInstituicao!: string;
  public anoFundacao!: number;
  public areaAtuacao!: string;
  public descricaoInstituicao!: string;
  public logo!: string;
  public documento!: string;
  public qrCode!: string;
  public idUsuario!:number;

  
  
}

OrganizacaoModel.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    field: "id_organizacao"//nome do id dentro do migration
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
  logradouro:{
    allowNull: false, 
        field: "logradouro",
        type: DataTypes.STRING(100),
  },
  numero:{
    allowNull: false, 
        field: "numero",
        type: DataTypes.STRING(100),
  },
  bairro:{
    allowNull: false, 
        field: "bairro",
        type: DataTypes.STRING(100),
  },
  cidade:{
    allowNull: false, 
        field: "cidade",
        type: DataTypes.STRING(100),
  },
  estado:{
    allowNull: false, 
        field: "estado",
        type: DataTypes.STRING(100),
  },
  cep:{
    allowNull: false, 
        field: "cep",
        type: DataTypes.STRING(100),
  },
  numeroPix:{
    allowNull: false, 
        field: "numeroPix",
        type: DataTypes.STRING(100),
  },
  site:{
    allowNull: false, 
        field: "site",
        type: DataTypes.STRING(100),
  },
  tipoInstituicao:{
    allowNull: false, 
        field: "tipoInstituicao",
        type: DataTypes.STRING(100),
  },
  anoFundacao:{
    allowNull: false, 
        field: "anoFundacao",
        type: DataTypes.INTEGER,
  },
  areaAtuacao:{
    allowNull: false, 
        field: "areaAtuacao",
        type: DataTypes.STRING(100),
  },
  descricaoInstituicao:{
    allowNull: false, 
        field: "descricaoInstituicao",
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
  qrCode:{
    allowNull: false, 
        field: "qrCode",
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
    tableName: 'organizacao', 
    modelName: 'Organizacao',  
    timestamps: false,       
  }
);
