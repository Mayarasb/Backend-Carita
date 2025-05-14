import { pontoArrecadacao } from "../interfaces/pontoArrecadacao.interface";
import { pontoArrecadacaoModel} from "../models/pontoArrecadacao.model";

export const listAll = async (): Promise<pontoArrecadacao[]> => {
    const pontosArrecadacao = await pontoArrecadacaoModel.findAll();
    return pontosArrecadacao;
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
