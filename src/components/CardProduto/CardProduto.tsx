import { IProduto } from "@/types/Produto";
import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "../Text/TextApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { Button } from "../Button/ButtonApp";
import { CardFoto } from "./CardFoto";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { CardPesoTamanho } from "./CardPesoTamanho";
import { useState } from "react";

interface propsCardProduto {
  produto: IProduto;
}

export function CardProduto(props: propsCardProduto) {
  const [produto, setProduto] = useState(props.produto);
  const { backgroundColor, borderRadius, isMobile } = useThemeApp();
  const width = isMobile ? "100%" : "50%";

  function onChangePeso(index: number, qtd?: number) {
    if (produto.pesos[index].precoProduto) {
      let novosPesos = [...produto.pesos];
      novosPesos[index].precoProduto!.quantidade = qtd;
      setProduto({
        ...produto,
        pesos: novosPesos,
      });
    }
  }

  function onChangeTamanho(index: number, qtd?: number) {
    if (produto.tamanhos[index].precoProduto) {
      let novosTamanhos = [...produto.tamanhos];
      novosTamanhos[index].precoProduto!.quantidade = qtd;
      setProduto({
        ...produto,
        tamanhos: novosTamanhos,
      });
    }
  }

  return (
    <BoxApp
      display="flex"
      boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
      hover={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      }}
      borderRadius={borderRadius}
      padding="1rem"
      gap="1rem"
      flexDirection={isMobile ? "column" : undefined}
    >
      <CardFoto
        width={width}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor.default}
        descricao={produto.descricao}
        foto={produto.foto}
      />
      <BoxApp
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        width={width}
        height="100%"
      >
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <TextApp
            titulo={produto.descricao}
            fontSize="18px"
            fontWeight={600}
          />
          <TextApp
            fontSize="12px"
            fontWeight={600}
            titulo={`#${produto.referencia ?? ""}`}
          />
        </BoxApp>
        {produto.pesos.length > 0 && (
          <BoxApp
            width="100%"
            display="flex"
            flexDirection="column"
            gap=".5rem"
          >
            <TextApp titulo="Pesos disponíveis" marginBotton="1rem" />
            {produto.pesos.map((peso, index) => (
              <CardPesoTamanho
                id={peso.id}
                onChange={(value) => onChangePeso(index, value)}
                descricao={peso.descricao}
                key={peso.id}
                precoProduto={peso.precoProduto}
              />
            ))}
          </BoxApp>
        )}
        {produto.tamanhos.length > 0 && (
          <BoxApp
            width="100%"
            display="flex"
            flexDirection="column"
            gap=".5rem"
          >
            <TextApp
              fontSize="12px"
              titulo="Tamanhos disponíveis"
              marginBotton="1rem"
            />
            {produto.tamanhos.map((tamanho, index) => (
              <CardPesoTamanho
                id={tamanho.id}
                onChange={(value) => onChangeTamanho(index, value)}
                key={tamanho.id}
                descricao={tamanho.descricao}
                precoProduto={tamanho.precoProduto}
              />
            ))}
          </BoxApp>
        )}
        <BoxApp width="100%" marginTop="1rem">
          <Button
            endIcon={listaDeIcones.carrinho}
            title={isMobile ? "Adicionar" : "Adicionar ao carrinho"}
            variant="contained"
            width="100%"
          />
        </BoxApp>
      </BoxApp>
    </BoxApp>
  );
}
