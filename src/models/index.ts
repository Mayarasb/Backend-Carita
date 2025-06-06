import { Usuario } from './../interfaces/usuario.interface';
import { Organizacao } from './../interfaces/organizacao.interface';
import { OrganizacaoModel } from "../models/organizacao.model";
import { ParceiroModel } from "../models/parceiro.model";
import { pontoArrecadacaoModel} from "../models/pontoArrecadacao.model";
import { UsuarioModel } from "../models/usuario.model"; 
import { ForeignKey } from 'sequelize-typescript';

Organizacao.belongsTo(models.Usuario,{ForeignKey:"i"})