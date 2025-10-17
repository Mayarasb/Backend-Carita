import { Evento } from "../interfaces/evento.interface";
import { EventoModel } from "../models/evento.model";
import { ParceiroModel } from "../models/parceiro.model";
import { OrganizacaoModel } from "../models/organizacao.model";
import { get } from "http";
import { Request, Response } from "express";

export const listAll = async (): Promise<Evento[]> => {
    console.log("Rota GET /eventos chamada");

    try{
        const eventos = await EventoModel.findAll(
            {
            include: [
                { model: ParceiroModel, as: "parceiro", attributes: ["nome"] },
                { model: OrganizacaoModel, as: "organizacao", attributes: ["nome"] },
            ],
        }
        );
        console.log("Eventos do banco:", eventos);
        return eventos.map(e => ({
            id: e.id,
            title: e.title,
            start: e.start,
            end: e.end ? e.end : undefined,
            description: e.description,
            address: e.address,
            idParceiro: e.idParceiro,
            idOrganizacao: e.idOrganizacao
        }));

    } catch(error){
        console.error("Erro ao buscar eventos:", error);
        return [];
    }

};

export const getById = async (id: number): Promise<Evento | null> => {
    const evento = await EventoModel.findOne({
        where: { id },
        include: [
            { model: ParceiroModel, as: "parceiro", attributes: ["nome"] },
            { model: OrganizacaoModel, as: "organizacao", attributes: ["nome"] },
        ],
    });
    if (!evento) return null;
    return {
        id: evento.id,
        title: evento.title,
        start: evento.start,
        end: evento.end ? evento.end : undefined,
        description: evento.description,
        address: evento.address,
        idParceiro: evento.idParceiro,
        idOrganizacao: evento.idOrganizacao
    };
};

export const create = async (dadosEvento: Evento): Promise<Evento> => {
    try {
    const novoEvento = await EventoModel.create(dadosEvento);
    console.log(novoEvento)
    return novoEvento;
    } catch (error) {
    console.error("Erro ao criar evento:", error);
    throw error;
  }};

export const update = async (id: number, data: Partial<Evento>): Promise<Evento | null> => {
    try { const evento = await EventoModel.findByPk(id);
    if (!evento) return null;

    await evento.update(data);
    return evento;
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        throw error;
    }
   
};

export const remove = async (id: number): Promise<boolean> => {
    const deletedCount = await EventoModel.destroy({ where: { id } });
    return deletedCount > 0;
}