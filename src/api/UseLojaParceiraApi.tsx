import { useApi } from "@/hooks/UseApi";
import { ILojasParceiras } from "@/types/LojaParceira";
import { IPaginacaoResponse } from "@/types/PaginacaoResponse";

export function useLojaParceiraApi() {
  const apiTodas = useApi({
    method: "GET",
    url: "lojas-parceiras/todas",
  });

  const apiPaginacao = useApi({
    method: "POST",
    url: "lojas-parceiras/paginacao",
    naoRenderizarResposta: true,
  });

  async function paginacaoLojasParceiras(
    skip: number
  ): Promise<IPaginacaoResponse<ILojasParceiras> | undefined> {
    return await apiPaginacao.action({
      body: {
        skip,
      },
    });
  }

  async function todasLojas(): Promise<ILojasParceiras[] | undefined> {
    return await apiTodas.action();
  }

  return {
    todasLojas,
    paginacaoLojasParceiras,
  };
}
