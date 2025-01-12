import { useApi } from "@/hooks/UseApi";
import { ILojasParceiras } from "@/types/LojaParceira";

export function useLojaParceiraApi() {
  const apiTodas = useApi({
    method: "GET",
    url: "lojas-parceiras/todas",
  });

  async function todasLojas(): Promise<ILojasParceiras[] | undefined> {
    return await apiTodas.action();
  }

  return {
    todasLojas,
  };
}
