"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { keysLocalStorage } from "@/config/keysLocalStorage";
import { useCarrinhoApi } from "@/api/UseCarrinhoApi";
import { useLocalStorage } from "@/hooks/UseLocalStorage";
import { IAdicionarProdutoCarrinho } from "@/types/AdicionarProdutoCarrinho";
import { StatusRequisicao } from "@/types/StatusRequisicao";
import { IProduto } from "@/types/Produto";
import { removerItemDeArrayPorIndex } from "@/utils/RemoverItemDeArrayPorIndex";

interface IAppCarrinhoContext {
  quantidadeItensCarrinho: number;
  adicionarItens: (itens: IAdicionarProdutoCarrinho[]) => Promise<any>;
  setProdutos: (produtos: IProduto[]) => void;
  statusAdicionar?: StatusRequisicao;
  statusObterItens?: StatusRequisicao;
  statusExcluirItem?: StatusRequisicao;
  produtos: IProduto[];
  obterProdutos: () => Promise<void>;
  excluirProdutoCarrinho: (index: number) => Promise<void>;
  resetarCarrinho: () => void;
}

interface IAppCarrinhoProvider {
  children: ReactNode;
}

export const AppCarrinhoContext = createContext({} as IAppCarrinhoContext);

export function AppCarrinhoProvider(props: IAppCarrinhoProvider) {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [quantidadeItensCarrinho, setQuantidadeItensCarrinho] = useState(0);
  const {
    obterQuantidadeItensCarrinho,
    adicionarItemCarrinho,
    obterItensCarrinho,
    excluirProduto,
  } = useCarrinhoApi();

  const { getItem } = useLocalStorage();

  async function init() {
    const jwt = getItem(keysLocalStorage.jwt);
    if (jwt) {
      const response = await obterQuantidadeItensCarrinho.fetch();
      if (response) {
        setQuantidadeItensCarrinho(response);
      }
    }
  }

  async function obterProdutos() {
    const response = await obterItensCarrinho.fetch();
    setProdutos(response ?? []);
  }

  async function adicionarItens(itens: IAdicionarProdutoCarrinho[]) {
    const response = await adicionarItemCarrinho.fetch(itens);
    if (response) {
      setQuantidadeItensCarrinho(response);
    }
  }

  async function excluirProdutoCarrinho(index: number) {
    const response = await excluirProduto.fecth(produtos[index].id);
    if (response) {
      setProdutos(removerItemDeArrayPorIndex(index, produtos));
    }
  }

  function resetarCarrinho() {
    setQuantidadeItensCarrinho(0);
    setProdutos([]);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <AppCarrinhoContext.Provider
      value={{
        quantidadeItensCarrinho,
        adicionarItens,
        statusAdicionar: adicionarItemCarrinho.status,
        statusObterItens: obterItensCarrinho.status,
        produtos,
        obterProdutos,
        setProdutos,
        excluirProdutoCarrinho,
        statusExcluirItem: excluirProduto.status,
        resetarCarrinho
      }}
    >
      {props.children}
    </AppCarrinhoContext.Provider>
  );
}
