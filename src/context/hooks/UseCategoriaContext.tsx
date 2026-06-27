import { ICategoria } from "@/types/Categoria";
import { createContext, useContext } from "react";

export interface ICategoriasContext {
    categorias: ICategoria[];
}

export const CategoriasContext = createContext({} as ICategoriasContext);

export function useCategoriasContext() {
    return useContext(CategoriasContext);
}
