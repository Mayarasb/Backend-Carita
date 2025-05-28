export interface Organizacao{

  id?: number,
  nome: string,
  cnpj: string,
  telefone: string,
  email:string,
  logradouro:string,
  numero: string,
  bairro: string,
  cidade:string,
  estado:string,
  cep: string,
  numeroPix:string,
  site:string,
  tipoInstituicao: string,
  anoFundacao: number,
  areaAtuacao:string,
  descricaoInstituicao: string,
  qrCode:string,
  logo?:string,
  documento?:string,
  idUsuario:number
}