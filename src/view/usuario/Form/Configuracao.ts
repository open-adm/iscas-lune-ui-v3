import { YupAdapter } from "@/adapters/YupAdapter";
import { IUsuarioCreate } from "@/types/Usuario";

export const initialValues: IUsuarioCreate = {
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  senha: "",
  reSenha: ""
};

export const schema = new YupAdapter()
  .email("email")
  .string("telefone")
  .string("nome")
  .string("cpf")
  .string("senha")
  .string("reSenha")
  .build();

export const tiposPessoa = [
  {
    id: 1,
    descricao: "Pessoa Jurídica",
  },
  {
    id: 2,
    descricao: "Pessoa Física",
  },
];
