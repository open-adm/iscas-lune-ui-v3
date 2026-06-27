import { useApi } from "@/hooks/UseApi";
import { ICategoria } from "@/types/Categoria";

export function useCategoriaApi() {
    const api = useApi({
        method: "GET",
        url: "ecommerce/categorias/listar",
        statusInicial: "loading",
    });

    async function listar(): Promise<ICategoria[] | undefined> {
        return await api.action()
    }

    return {
        listar
    }
}