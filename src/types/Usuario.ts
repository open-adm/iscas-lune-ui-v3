import { IBase } from "./Base";

export interface IUsuario extends IBase {
  nome: string;
  email: string;
  telefone: string;
  cnpj?: string;
  cpf?: string;
  pedidosEmAberto?: number;
  quantidadeDePedido?: number;
}

export interface IUsuarioCreate {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
  reSenha: string;
}
