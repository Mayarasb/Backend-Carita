import { promises } from "dns";
import { Usuario } from "../interfaces/usuario.interface";
import { UsuarioModel } from "../models/usuario.model";
import { json } from "body-parser";

export const listAll = async (): Promise<Usuario[]> => {
  const usuarios = await UsuarioModel.findAll(); // Certifique-se de que está pegando todos os campos, inclusive senha
  console.log (JSON.stringify(usuarios));
  return usuarios;
};

export const getById = async (id:number): Promise<Usuario| null> => {
    const usuario = await UsuarioModel.findOne({
        where:{ 
            id: id
        }
    });
    return usuario;
};

export const getByEmail = async (email: string) => {
    const usuario = await UsuarioModel.findOne({
        where: {
            email: email
        }
    });
    return usuario;
}

export const create = async (dadosUsuario: Usuario): Promise<Usuario> => {
  try {
    const novoUsuario = await UsuarioModel.create(dadosUsuario);
    return novoUsuario;
  } catch (error) {
    console.error("❌ Erro no controller ao criar usuário:", error); // <-- Mostra erro detalhado
    throw error;
  }
};

export const update = async (id: number, data: Partial<Usuario>): Promise<Usuario| null> => {
    const usuario = await UsuarioModel.findByPk(id);
    if (!usuario) return null;

    await usuario.update(data);
    return usuario;
};

export const desativar = async(id:number):Promise<boolean> =>{
    const [nro_linhas_alteradas] = await UsuarioModel.update({
        status: false 
    }, {
        where:{
            id:id
        }
    })
    return !!nro_linhas_alteradas;
}

export const reativar = async (id: number): Promise<boolean> => {
  const [linhasAtualizadas] = await UsuarioModel.update({ status: true }, { where: { id } });
  return !!linhasAtualizadas;
};

