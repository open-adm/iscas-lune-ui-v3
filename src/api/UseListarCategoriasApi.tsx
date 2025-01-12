import { useApi } from "@/hooks/UseApi";
import { ICategoria } from "@/types/Categoria";
import { StatusRequisicao } from "@/types/StatusRequisicao";
import { useEffect, useState } from "react";

export function useListarCategoriasApi() {
  const [status, setStatus] = useState<StatusRequisicao>();
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const apiList = useApi({
    method: "GET",
    url: "categorias/list",
  });

  async function listarCategorias() {
    setStatus("loading");
    const response = await apiList.action<ICategoria[]>();
    if (response) {
      setCategorias(response);
      setStatus("success");
      return;
    }

    setStatus("error");
  }

  useEffect(() => {
    listarCategorias();
  }, []);

  return {
    status,
    categorias,
  };
}
