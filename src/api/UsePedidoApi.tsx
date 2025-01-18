import { useApi } from "@/hooks/UseApi";
import { IPedidoMinimo } from "@/types/PedidoMinimo";
import { pedidoRotasApi } from "./rotas/PedidoRotasApi";
import { ICreatePedido } from "@/types/CreatePedido";

export function UsePedidoApi() {
  const apiPedidoMinimo = useApi({
    method: "GET",
    url: pedidoRotasApi.pedidoMinimo,
    naoRenderizarErro: true,
    naoRenderizarResposta: true,
  });

  const apiPedidoCreate = useApi({
    method: "POST",
    url: pedidoRotasApi.createPedido,
  });

  async function obterPedidoMinimo(): Promise<IPedidoMinimo | undefined> {
    return await apiPedidoMinimo.action();
  }

  async function criarPedido(body: ICreatePedido[]): Promise<any> {
    return await apiPedidoCreate.action({
      body,
      message: "Pedido criado com sucesso!",
    });
  }

  return {
    obterPedidoMinimo: {
      fetch: obterPedidoMinimo,
      status: apiPedidoMinimo.status,
    },
    criarPedido: {
      fecth: criarPedido,
      status: apiPedidoCreate.status,
    },
  };
}
