"use client";

import { useProdutoApi } from "@/api/UseProdutoApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { GridApp } from "@/components/Grid/GridApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { TextApp } from "@/components/Text/TextApp";
import { IdPage } from "@/types/PageId";
import { IProduto } from "@/types/Produto";
import { useEffect, useState } from "react";
import { CardProduto } from "@/components/CardProduto/CardProduto";

export function ViewCategoria(props: IdPage) {
  const { listarPorCategorias } = useProdutoApi();
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [loading, setLoading] = useState(true);

  async function init() {
    const response = await listarPorCategorias(props.id);
    if (response) {
      setProdutos(response);
    }
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return <LoadingApp height="300px" marginTop="1rem" />;
  }

  const categoria =
    produtos.length === 0 ? "" : produtos[0].categoria?.descricao;

  return (
    <BoxApp padding="1rem">
      <BoxApp
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="1rem"
      >
        <TextApp fontSize="20px" fontWeight={600} titulo={categoria ?? ""} />
      </BoxApp>
      <GridApp container spacing={3}>
        {produtos.map((produto) => (
          <GridApp key={produto.id} xs={12} sm={6}>
            <CardProduto produto={produto} />
          </GridApp>
        ))}
      </GridApp>
    </BoxApp>
  );
}
