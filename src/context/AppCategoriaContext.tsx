import { useCategoriaApi } from "@/api/UseCategoriaApi";
import { ICategoria } from "@/types/Categoria";
import { ReactNode, useEffect, useState } from "react";
import { CategoriasContext } from "./hooks/UseCategoriaContext";

interface ICategoriasProvider {
    children: ReactNode;
}

export function CategoriasProvider(props: ICategoriasProvider) {
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const { listar } = useCategoriaApi()


    async function init() {
        const response = await listar();
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
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );
}
