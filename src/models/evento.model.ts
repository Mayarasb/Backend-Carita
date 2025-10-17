import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import {Evento} from "../interfaces/evento.interface";
import { ParceiroModel } from "./parceiro.model"; 
import { OrganizacaoModel } from "./organizacao.model";

type EventoCreationalAttributes = Optional<Evento, "id">;
export class EventoModel extends Model<Evento, EventoCreationalAttributes> {
  public id!: number;
  public title!: string;
  public start!: string;
  public end?: string;
  public description?: string;
  public address?: string;
  public idParceiro?: number;
  public idOrganizacao?: number;   

  public parceiro?: { nome: string };
  public organizacao?: { nome: string };
}

EventoModel.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    field: "id_evento"
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "titulo"
  },
  start: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "inicio"
  },
  end: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "fim"
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "descricao"
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "endereco"       
  },
  idParceiro: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_parceiro",
     references: {
      model: 'parceiro',
      key: 'id_parceiro',
    },
  },
  idOrganizacao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_organizacao",
    references: {
      model: 'organizacao',
      key: 'id_organizacao',
    },
  },
}, {
  sequelize,
  modelName: "Evento",
  tableName: "eventos",
  timestamps: false,
});

EventoModel.belongsTo(ParceiroModel, { foreignKey: "id_parceiro", as: "parceiro" });
EventoModel.belongsTo(OrganizacaoModel, { foreignKey: "id_organizacao", as: "organizacao" });
