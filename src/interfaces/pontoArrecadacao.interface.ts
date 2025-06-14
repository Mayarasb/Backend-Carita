export interface pontoArrecadacao {
  id?: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  horarioFuncionamento: string;
  idParceiro: number;
  parceiro?: {
    nome: string;
  };
}
