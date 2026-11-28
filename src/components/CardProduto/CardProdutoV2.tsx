import { listaDeIcones } from "@/config/ListaDeIcones";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { IProdutoEcommerce } from "@/types/Produto";
import { cleanFormatMoney, formatMoney } from "@/utils/FormatMoney";
import { useContext, useEffect, useState } from "react";
import { Button } from "../Button/ButtonApp";
import { useSnackbar } from "../SnackBar/UseSnackBar";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "../Text/TextApp";
import styles from "./CarProduto.module.css";
import { CardFoto } from "./CardFoto";
import { CardPesoTamanhoV2 } from "./CardPesoTamanhoV2";

interface propsCardProduto {
  produto: IProdutoEcommerce;
  desabilitarBtnAddCarrinho?: boolean;
  onBlur?: (produto: IProdutoEcommerce) => void;
  habilitarExclusaoProduto?: boolean;
  index?: number;
}

export function CardProdutoV2(props: propsCardProduto) {
  const { show } = useSnackbar();
  const [produto, setProduto] = useState(props.produto);
  const {
    adicionarItens,
    statusAdicionar,
    excluirProdutoCarrinho,
    statusExcluirItem,
  } = useContext(AppCarrinhoContext);

  const { backgroundColor, borderRadius, isMobile } = useThemeApp();
  const width = "100%";
  const grupos = [
    { titulo: "Peso", itens: produto.pesos, onChange: onChangePeso },
    { titulo: "Tamanho", itens: produto.tamanhos, onChange: onChangeTamanho },
  ];
  const { unidades, subtotal } = [...produto.pesos, ...produto.tamanhos].reduce(
    (total, item) => {
      const quantidade = cleanFormatMoney(item.quantidade) ?? 0;
      return {
        unidades: total.unidades + quantidade,
        subtotal: total.subtotal + quantidade * (item.valorUnitario ?? 0),
      };
    },
    { unidades: 0, subtotal: 0 }
  );

  function onChangePeso(index: number, qtd?: number) {
    if (
      produto.pesos[index] &&
      produto.pesos[index].quantidadeEstoqueDisponivel &&
      Number(qtd) > produto.pesos[index].quantidadeEstoqueDisponivel
    ) {
      show(
        `Quantidade disponível: ${produto.pesos[index].quantidadeEstoqueDisponivel}.`,
        "info"
      );
      return;
    }

    if (produto.pesos[index].valorUnitario) {
      let novosPesos = [...produto.pesos];
      novosPesos[index].quantidade = qtd;
      setProduto({
        ...produto,
        pesos: novosPesos,
      });
    }
  }

  function onChangeTamanho(index: number, qtd?: number) {
    if (
      produto.tamanhos[index] &&
      produto.tamanhos[index].quantidadeEstoqueDisponivel &&
      Number(qtd) > produto.tamanhos[index].quantidadeEstoqueDisponivel
    ) {
      show(
        `Quantidade disponível: ${produto.tamanhos[index].quantidadeEstoqueDisponivel}.`,
        "info"
      );
      return;
    }
    if (produto.tamanhos[index].valorUnitario) {
      let novosTamanhos = [...produto.tamanhos];
      novosTamanhos[index].quantidade = qtd;
      setProduto({
        ...produto,
        tamanhos: novosTamanhos,
      });
    }
  }

  async function adicionar() {
    const tamanhos = produto.tamanhos
      .filter((x) => x.quantidade)
      .map((x) => {
        return {
          tamanhoId: x.id,
          produtoId: produto.id,
          quantidade: cleanFormatMoney(x.quantidade) ?? 0,
        };
      });
    const pesos = produto.pesos
      .filter((x) => x.quantidade)
      .map((x) => {
        return {
          pesoId: x.id,
          produtoId: produto.id,
          quantidade: cleanFormatMoney(x.quantidade) ?? 0,
        };
      });

    if (tamanhos.length === 0 && pesos.length === 0) {
      return;
    }

    await adicionarItens([...pesos, ...tamanhos]);

    setProduto({
      ...produto,
      pesos: produto.pesos.map((peso) => {
        return {
          ...peso,
          quantidade: undefined,
        };
      }),
      tamanhos: produto.tamanhos.map((tamanho) => {
        return {
          ...tamanho,
          quantidade: undefined,
        };
      }),
    });
  }

  async function excluir() {
    if (props.index === undefined || props.index === null) {
      return;
    }

    await excluirProdutoCarrinho(props.index);
  }

  function onBlur() {
    if (props.onBlur) {
      props.onBlur(produto);
    }
  }

  useEffect(() => {
    const atualizarProduto = () => {
      setProduto(props.produto)
    }

    atualizarProduto();
  }, [props.produto])

  return (
    <BoxApp
      display="flex"
      boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
      hover={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      }}
      borderRadius={borderRadius}
      gap="1rem"
      backgroundColor={backgroundColor.card}
      flexDirection={"column"}
    >
      <CardFoto
        width={width}
        borderRadius={borderRadius}
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
          padding="0rem 1rem 0rem 1rem"
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
        <form
          style={{ width: "100%", padding: '1rem' }}
          onSubmit={async (e) => {
            e.preventDefault();
            if (!props.desabilitarBtnAddCarrinho && statusAdicionar !== "loading") {
              await adicionar();
            }
          }}
        >
          {grupos.map(({ titulo, itens, onChange }) =>
            itens.length > 0 && (
              <div key={titulo}>
                <div className={styles.colunas}>
                  <span>{titulo} / Estoque</span>
                  <span>Quantidade</span>
                  <span>Valor un.</span>
                </div>
                {itens.map((item, index) => (
                  <CardPesoTamanhoV2
                    key={item.id}
                    descricao={item.descricao}
                    quantidadeEstoqueDisponivel={item.quantidadeEstoqueDisponivel}
                    temEstoqueDisponivel={item.temEstoqueDisponivel}
                    quantidade={item.quantidade}
                    valorUnitario={item.valorUnitario}
                    onChange={(value) => onChange(index, value)}
                    onBlur={onBlur}
                  />
                ))}
              </div>
            )
          )}
          <div className={styles.resumo}>
            <div>
              <span>Itens selecionados</span>
              <strong>{unidades} {unidades === 1 ? "unidade" : "unidades"}</strong>
            </div>
            <div>
              <span>Subtotal</span>
              <strong>{formatMoney(subtotal)}</strong>
            </div>
          </div>
          <BoxApp width="100%" marginTop="1rem">
            {!props.desabilitarBtnAddCarrinho && (
              <Button
                onClick={adicionar}
                endIcon={listaDeIcones.carrinho}
                title={isMobile ? "Adicionar" : "Adicionar ao carrinho"}
                variant="contained"
                width="100%"
                loading={statusAdicionar === "loading"}
                type="submit"
              />
            )}
            {props.habilitarExclusaoProduto && (
              <Button
                onClick={excluir}
                endIcon={listaDeIcones.lixeira}
                title={"Excluir"}
                variant="outlined"
                width="100%"
                coricon="red"
                loading={statusExcluirItem === "loading"}
              />
            )}
          </BoxApp>
        </form>
      </BoxApp>
    </BoxApp>
  );
}
