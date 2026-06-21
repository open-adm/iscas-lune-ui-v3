import { useApi } from "@/hooks/UseApi";
import { ICategoria } from "@/types/Categoria";
import { ReactNode, useEffect, useState } from "react";
import { CategoriasContext } from "./hooks/UseCategoriaContext";

interface ICategoriasProvider {
    children: ReactNode;
}

export function CategoriasProvider(props: ICategoriasProvider) {
    const [categorias, setCategorias] = useState<ICategoria[]>([]);

    const api = useApi({
        method: "GET",
        url: "ecommerce/categorias/listar",
        statusInicial: "loading",
    });

    async function init() {
        const response = await api.action<ICategoria[]>();
        setCategorias(response || []);
    }

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CategoriasContext.Provider
            value={{
                categorias,
                loadingCategorias: api.loading,
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );
}
