"use client";

import { useListarCategoriasApi } from "@/api/UseListarCategoriasApi";
import { usePesoApi } from "@/api/UsePesoTamanho";
import { useProdutoApi } from "@/api/UseProdutoApi";
import { useTamanhoApi } from "@/api/UseTamanhoApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { CardProduto } from "@/components/CardProduto/CardProduto";
import { GridApp } from "@/components/Grid/GridApp";
import { IconButtonTooltipApp } from "@/components/Icon/IconButtonTooltipApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import ModalApp from "@/components/Modal/ModalApp";
import SelectApp from "@/components/Select/SelectApp";
import { TextApp } from "@/components/Text/TextApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { IPaginacaoResponse } from "@/types/PaginacaoResponse";
import { IPeso } from "@/types/Peso";
import { IProduto } from "@/types/Produto";
import { ITamanhos } from "@/types/Tamanho";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

export function ViewProduto() {
  const { paginacaoProduto } = useProdutoApi();
  const { listarTamanhos } = useTamanhoApi();
  const { listarPesos } = usePesoApi();
  const { categorias } = useListarCategoriasApi();
  const { isMobile } = useThemeApp();
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingFiltros, setLoadingFiltros] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [categoria, setCategoria] = useState<string>("");
  const [pesos, setPesos] = useState<IPeso[]>([]);
  const [peso, setPeso] = useState<string>("");
  const [tamanhos, setTamanhos] = useState<ITamanhos[]>([]);
  const [tamanho, setTamanho] = useState<string>("");
  const [paginacao, setPaginacao] = useState<IPaginacaoResponse<IProduto>>({
    totalDeRegistros: 0,
    totalPaginas: 0,
    values: [],
  });

  async function init() {
    setLoading(true);
    const response = await paginacaoProduto({
      page: pagina,
      categoriaId: categoria,
      pesoId: peso,
      tamanhoId: tamanho,
    });
    if (response) {
      setPaginacao(response);
    }
    setLoading(false);
  }

  async function carregarFiltros() {
    setOpenModal(true);
    setLoadingFiltros(true);

    if (pesos.length === 0) {
      const responsePesos = await listarPesos();
      if (responsePesos) {
        setPesos(responsePesos);
      }
    }

    if (tamanhos.length === 0) {
      const responseTamanhos = await listarTamanhos();
      if (responseTamanhos) {
        setTamanhos(responseTamanhos);
      }
    }

    setLoadingFiltros(false);
  }

  useEffect(() => {
    init();
  }, [pagina]);

  if (loading) {
    return <LoadingApp height="300px" marginTop="1rem" />;
  }

  if (paginacao.values.length === 0) {
    return <></>;
  }

  return (
    <>
      <BoxApp padding="1rem">
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="1rem"
          gap="1rem"
        >
          <TextApp fontSize="20px" fontWeight={600} titulo={"Produtos"} />
          <IconButtonTooltipApp
            onClick={carregarFiltros}
            icon={listaDeIcones.filtro}
            titulo="Filtros"
          />
        </BoxApp>
        <GridApp container spacing={3}>
          {paginacao.values.map((produto) => (
            <GridApp key={produto.id} xs={12} sm={6}>
              <CardProduto produto={produto} />
            </GridApp>
          ))}
        </GridApp>
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="1rem"
        >
          <Pagination
            count={paginacao.totalPaginas}
            page={pagina}
            onChange={(_, value) => setPagina(value)}
            variant="outlined"
            shape="rounded"
          />
        </BoxApp>
      </BoxApp>
      <ModalApp close={() => setOpenModal(false)} open={openModal}>
        {loadingFiltros ? (
          <LoadingApp width="350px" height="300px" marginTop="1rem" />
        ) : (
          <form>
            <BoxApp
              width={isMobile ? "calc(100vw - 120px)" : "350px"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap="1rem"
              padding="1rem"
            >
              <SelectApp
                keyDescricao="descricao"
                keyValue="id"
                label="Categoria"
                opcoes={categorias}
                id="categorias"
                width="100%"
                value={categoria}
                onChange={(cat) => setCategoria(cat)}
              />
              <SelectApp
                width="100%"
                keyDescricao="descricao"
                keyValue="id"
                label="Peso"
                opcoes={pesos}
                id="pesos"
                value={peso}
                onChange={(p) => setPeso(p)}
              />
              <SelectApp
                value={tamanho}
                onChange={(t) => setTamanho(t)}
                width="100%"
                keyDescricao="descricao"
                keyValue="id"
                label="Tamanho"
                opcoes={tamanhos}
                id="tamanhos"
              />
              <Button
                variant="contained"
                title="Filtrar"
                onClick={async () => {
                  await init();
                  setOpenModal(false);
                }}
              />
            </BoxApp>
          </form>
        )}
      </ModalApp>
    </>
  );
}
