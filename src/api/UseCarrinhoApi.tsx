import { useApi } from "@/hooks/UseApi";

export function useCarrinhoApi() {
  const addCarrinho = useApi({
    method: "POST",
    url: "",
  });
}
