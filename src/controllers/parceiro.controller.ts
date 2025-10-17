import { Parceiro } from "../interfaces/parceiro.interface";
import { ParceiroModel } from "../models/parceiro.model";
import { pontoArrecadacaoModel } from "../models/pontoArrecadacao.model";
import { UsuarioModel } from "../models/usuario.model";

export const listAll = async (): Promise<Parceiro[]> => {
    const parceiros = await ParceiroModel.findAll({
    include: [
      {
        model: UsuarioModel,
        where: { status: true }, 
      }
    ]
  });
    return parceiros;
};

export const getById = async (id:number): Promise<Parceiro | null> => {
    const parceiro = await ParceiroModel.findOne({
        where:{ 
            id: id
        }
    });
    return parceiro;
};

export const getByUsuarioId = async (idUsuario: number): Promise<Parceiro | null> => {
  const parceiro = await ParceiroModel.findOne({
    where: { idUsuario },
    include: [
      {
        model: pontoArrecadacaoModel,
        as: 'pontoArrecadacao', // usa o alias definido no hasOne
      },
    ],
  });
  return parceiro;
};

export const create = async (dadosParceiro: Parceiro): Promise<Parceiro> => {
  try{
    const novoParceiro = await ParceiroModel.create(dadosParceiro);
    return novoParceiro;
  } catch(error){
    console.error("Erro ao criar parceiro:", error);
    throw error;
  }
};

import { Request, Response } from "express";

export const createParceiroComPonto = async (req: Request, res: Response) => {
  try {
    const {
      nome,
      cnpj,
      telefone,
      email,
      tipoParceiro,
      areaAtuacao,
      logo,
      documento,
      idUsuario,
      pontoArrecadacao,
    } = req.body;


    const novoParceiro = await ParceiroModel.create({
      nome,
      cnpj,
      telefone,
      email,
      tipoParceiro,
      areaAtuacao,
      logo,
      documento,
      idUsuario,
    });

    if (tipoParceiro === 'Captador' && pontoArrecadacao) {
      const {
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        horarioFuncionamento
      } = pontoArrecadacao;

      await pontoArrecadacaoModel.create({
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        horarioFuncionamento,
        idParceiro: novoParceiro.id
      });
    }

    res.status(201).json({
      message: 'Parceiro criado com sucesso',
      parceiro: novoParceiro,
    });
  } catch (error) {
    console.error('Erro ao criar parceiro com ponto:', error);
    res.status(500).json({ message: 'Erro ao criar parceiro com ponto' });
  }
};

export const update = async (id: number, data: Partial<Parceiro>): Promise<Parceiro | null> => {
    const parceiro = await ParceiroModel.findByPk(id);
    if (!parceiro) return null;

    await parceiro.update(data);
    return parceiro;
};

