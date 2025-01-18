export interface ICreatePedido {
  produtoId: string;
  pesoId?: string;
  tamanhoId?: string;
  quantidade: number;
  valorUnitario: number;
}
