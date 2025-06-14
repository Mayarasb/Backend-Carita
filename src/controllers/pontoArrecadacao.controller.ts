import { pontoArrecadacao } from "../interfaces/pontoArrecadacao.interface";
import { pontoArrecadacaoModel} from "../models/pontoArrecadacao.model";
import { ParceiroModel } from "../models/parceiro.model";

export const listAll = async (): Promise<pontoArrecadacao[]> => {
  const pontosArrecadacao = await pontoArrecadacaoModel.findAll({
    include: [{
      model: ParceiroModel,
      as: 'parceiro',      // tem que ser o alias da associação
      attributes: ['nome'] // seleciona só o que precisa para economizar
    }]
  });
  return pontosArrecadacao;
};

export const getById = async (id:number): Promise<pontoArrecadacao | null> => {
    const pontoArrecadacao = await pontoArrecadacaoModel.findOne({
        where:{ 
            id: id
        }
    });
    return pontoArrecadacao;
};

export const create = async (dadosPontoArrecadacao: pontoArrecadacao): Promise<pontoArrecadacao> => {
    const novoPonto = await pontoArrecadacaoModel.create(dadosPontoArrecadacao);
    return novoPonto;
};

export const update = async (id: number, data: Partial<pontoArrecadacao>): Promise<pontoArrecadacao | null> => {
    const PontoArrecadacao = await pontoArrecadacaoModel.findByPk(id);
    if (!PontoArrecadacao) return null;

    await PontoArrecadacao.update(data);
    return PontoArrecadacao;
};
