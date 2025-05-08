import { Parceiro } from "../interfaces/parceiro.interface";
import { ParceiroModel } from "../models/parceiro.model";

export const listAll = async (): Promise<Parceiro[]> => {
    const parceiros = await ParceiroModel.findAll();
    return parceiros;
};

export const create = async (dadosParceiro: Parceiro): Promise<Parceiro> => {
    const novoParceiro = await ParceiroModel.create(dadosParceiro);
    return novoParceiro;
};

export const update = async (id: number, data: Partial<Parceiro>): Promise<Parceiro | null> => {
    const parceiro = await ParceiroModel.findByPk(id);
    if (!parceiro) return null;

    await parceiro.update(data);
    return parceiro;
};
