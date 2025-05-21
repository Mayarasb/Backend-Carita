import { Usuario } from "../interfaces/usuario.interface";
import { UsuarioModel } from "../models/usuario.model";

export const listAll = async (): Promise<Usuario[]> => {
    const usuarios = await UsuarioModel.findAll();
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

export const create = async (dadosUsuario: Usuario): Promise<Usuario> => {
    const novoUsuario = await UsuarioModel.create(dadosUsuario);
    return novoUsuario;
};

export const update = async (id: number, data: Partial<Usuario>): Promise<Usuario| null> => {
    const usuario = await UsuarioModel.findByPk(id);
    if (!usuario) return null;

    await usuario.update(data);
    return usuario;
};
