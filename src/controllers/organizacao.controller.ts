import { Organizacao } from "../interfaces/organizacao.interface";
import { OrganizacaoModel } from "../models/organizacao.model";

export const listAll = async (): Promise<Organizacao[]> => {
    const organizacoes = await OrganizacaoModel.findAll();
    return organizacoes;
};
export const getById = async (id:number): Promise<Organizacao | null> => {
    const organizacoes = await OrganizacaoModel.findOne({
        where:{ 
            id: id
        }
    });
    return organizacoes;
};

export const create = async (dadosOrganizacao: Organizacao): Promise<Organizacao> => {
    const novaOrganizacao = await OrganizacaoModel.create(dadosOrganizacao);
    return novaOrganizacao;
};

export const update = async (id: number, data: Partial<Organizacao>): Promise<Organizacao | null> => {
    const organizacao = await OrganizacaoModel.findByPk(id);
    if (!organizacao) return null;

    await organizacao.update(data);
    return organizacao;
};
