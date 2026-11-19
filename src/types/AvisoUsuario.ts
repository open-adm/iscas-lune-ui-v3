export interface IAvisoUsuario {
  id: string;
  usuarioId: string;
  mensagem: string | null;
  dataDeCriacao: string;
  dataDeVisualizacao: string | null;
  ativo: boolean;
  visto: boolean;
}

export interface IResultadoAvisoUsuario {
  resultado: boolean;
}
