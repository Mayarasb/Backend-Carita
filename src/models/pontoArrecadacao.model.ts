import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { pontoArrecadacao } from "../interfaces/pontoArrecadacao.interface";
import { ParceiroModel } from "./parceiro.model"; // Importa o model do parceiro

type pontoArrecadacaoCreationalAttributes = Optional<pontoArrecadacao, "id">;

export class pontoArrecadacaoModel extends Model<pontoArrecadacao, pontoArrecadacaoCreationalAttributes> {
  public id!: number;
  public logradouro!: string;
  public numero!: string;
  public bairro!: string;
  public cidade!: string;
  public estado!: string;
  public cep!: string;
  public horarioFuncionamento!: string;
  public idParceiro!: number;

  // Associação opcional (para uso no TypeScript)
  public parceiro?: { nome: string };
}

pontoArrecadacaoModel.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    field: "id_pontoArrecadacao"
  },
  logradouro: {
    allowNull: false,
    field: "logradouro",
    type: DataTypes.STRING(100),
  },
  numero: {
    allowNull: false,
    field: "numero",
    type: DataTypes.STRING(100),
  },
  bairro: {
    allowNull: false,
    field: "bairro",
    type: DataTypes.STRING(100),
  },
  cidade: {
    allowNull: false,
    field: "cidade",
    type: DataTypes.STRING(100),
  },
  estado: {
    allowNull: false,
    field: "estado",
    type: DataTypes.STRING(100),
  },
  cep: {
    allowNull: false,
    field: "cep",
    type: DataTypes.STRING(100),
  },
  horarioFuncionamento: {
    allowNull: false,
    field: "horario",
    type: DataTypes.STRING(100),
  },
  idParceiro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'parceiro',
      key: 'id_parceiro',
    },
    field: 'idParceiro',
  }
}, {
  sequelize,
  tableName: 'pontoArrecadacao',
  modelName: 'PontoArrecadacao',
  timestamps: false,
});

// Define o relacionamento com o parceiro
pontoArrecadacaoModel.belongsTo(ParceiroModel, {
  foreignKey: 'idParceiro',
  as: 'parceiro',
});
