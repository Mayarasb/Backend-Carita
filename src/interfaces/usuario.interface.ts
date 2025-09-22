export interface Usuario{
    id?: number,
    email: string,
    cpf: string,
    senha?:string,
    status: boolean,
    createdAt: Date,
    updatedAt: Date
  }