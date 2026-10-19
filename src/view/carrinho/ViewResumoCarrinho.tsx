import { UsePedidoApi } from "@/api/UsePedidoApi";
import { AlertApp } from "@/components/Alert/AlertApp";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { DividerApp } from "@/components/Divider/DividerApp";
import ModalApp from "@/components/Modal/ModalApp";
import { useSnackbar } from "@/components/SnackBar/UseSnackBar";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { IPedidoMinimo } from "@/types/PedidoMinimo";
import { formatMoney } from "@/utils/FormatMoney";
import { useContext, useEffect, useState } from "react";
import { ViewEnderecoCarrinho } from "./ViewEnderecoCarrinho";
import { ViewTotalizadorCarrinho } from "./ViewTotalizadoCarrinho";

export function ViewResumoCarrinho() {
  const [pedidoMinimo, setPedidoMinimo] = useState<IPedidoMinimo>();
  const [modalPedidoFinalizadoAberto, setModalPedidoFinalizadoAberto] =
    useState(false);
  const { obterPedidoMinimo, criarPedido } = UsePedidoApi();
  const { produtos, resetarCarrinho, enderecoUsuario } =
    useContext(AppCarrinhoContext);
  const { navigate } = useNavigateApp();
  const { show } = useSnackbar();
  const pesosComQuantidade = produtos.flatMap((x) =>
    x.pesos.filter((y) => y.quantidade)
  );
  const tamanhosComQuantidade = produtos.flatMap((x) =>
    x.tamanhos.filter((y) => y.quantidade)
  );

  const totalPorPeso = pesosComQuantidade.reduce(
    (valor, peso) =>
      valor +
      (peso.valorUnitario ?? 0) *
      (peso.quantidade ?? 0),
    0
  );

  const totalPorTamanho = tamanhosComQuantidade.reduce(
    (valor, peso) =>
      valor +
      (peso.valorUnitario ?? 0) *
      (peso.quantidade ?? 0),
    0
  );

  const totalPedido = totalPorPeso + totalPorTamanho;
  const naoFechouPedidoMinimo = totalPedido > (pedidoMinimo?.pedidoMinimo ?? 0);

  async function init() {
    const response = await obterPedidoMinimo.fetch();
    setPedidoMinimo(response);
  }

  async function submit() {
    if (
      (pesosComQuantidade.length === 0 && tamanhosComQuantidade.length === 0) ||
      !naoFechouPedidoMinimo
    ) {
      return;
    }

    if (!enderecoUsuario) {
      show("Informe o endereço de entrega");
      return;
    }

    const body = [
      ...produtos.flatMap((produto) => {
        return produto.tamanhos
          .filter((x) => x.quantidade)
          .map((tamanho) => {
            return {
              produtoId: produto.id,
              tamanhoId: tamanho.id,
              quantidade: tamanho.quantidade ?? 0,
              valorUnitario: tamanho.valorUnitario ?? 0,
            };
          });
      }),
      ...produtos.flatMap((produto) => {
        return produto.pesos
          .filter((x) => x.quantidade)
          .map((peso) => {
            return {
              produtoId: produto.id,
              pesoId: peso.id,
              quantidade: peso.quantidade ?? 0,
              valorUnitario: peso.valorUnitario ?? 0,
            };
          });
      }),
    ];

    if (body.length === 0) {
      return;
    }

    const response = await criarPedido.fecth({
      itens: body,
      enderecoEntrega: enderecoUsuario,
    });
    if (response) {
      if (pedidoMinimo?.mensagemPedidoFinalizado?.trim()) {
        setModalPedidoFinalizadoAberto(true);
        return;
      }

      resetarCarrinho();
      navigate(rotas.pedidoFinalizado);
    }
  }

  function fecharModalPedidoFinalizado() {
    setModalPedidoFinalizadoAberto(false);
    resetarCarrinho();
    navigate(rotas.home);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <ModalApp
        fullWidth
        maxWidth="sm"
        open={modalPedidoFinalizadoAberto}
        close={fecharModalPedidoFinalizado}
      >
        <TextApp
          titulo={pedidoMinimo?.mensagemPedidoFinalizado ?? ""}
          whiteSpace="pre-line"
        />
      </ModalApp>
      <BoxApp
        height="calc(100vh - 150px)"
        display="flex"
        flexDirection="column"
        padding="1rem"
      >
        <TextApp titulo="Resumo" fontSize="18px" fontWeight={600} />
        <DividerApp width="100%" />
        <BoxApp
          display="flex"
          alignItems="start"
          justifyContent="center"
          flexDirection="column"
          gap=".5rem"
          width="100%"
          marginTop="1rem"
          height="100%"
        >
          <ViewTotalizadorCarrinho
            titulo="Quantidade de produtos"
            texto={`${produtos.length}`}
          />

          <ViewTotalizadorCarrinho
            titulo="Quantidade de tamanhos"
            texto={`${tamanhosComQuantidade.length}`}
          />
          <ViewTotalizadorCarrinho
            titulo="Quantidade de pesos"
            texto={`${pesosComQuantidade.length}`}
          />
        </BoxApp>
        <DividerApp width="100%" />
        <BoxApp
          height="100%"
          display="flex"
          alignItems="start"
          justifyContent="center"
          flexDirection="column"
          gap=".5rem"
          width="100%"
          marginTop="1rem"
        >
          <ViewTotalizadorCarrinho
            titulo="Total por peso"
            texto={formatMoney(totalPorPeso) ?? ""}
          />
          <ViewTotalizadorCarrinho
            titulo="Total por tamanho"
            texto={formatMoney(totalPorTamanho) ?? ""}
          />
          <ViewTotalizadorCarrinho
            titulo="Total"
            texto={formatMoney(totalPedido) ?? ""}
          />
        </BoxApp>
        <DividerApp width="100%" />
        {pedidoMinimo?.pedidoMinimo && !naoFechouPedidoMinimo ? (
          <AlertApp
            tipo="error"
            texto={`Atenção, pedido mínimo no valor de: ${formatMoney(
              pedidoMinimo.pedidoMinimo
            )}`}
            sx={{ marginTop: "1rem" }}
          />
        ) : (
          <></>
        )}
        <ViewEnderecoCarrinho />
        <BoxApp marginTop="1rem">
          <Button
            disabled={!naoFechouPedidoMinimo}
            title="Finalizar pedido"
            variant="contained"
            fullWidth
            loading={criarPedido.status === "loading"}
            onClick={submit}
          />
        </BoxApp>
      </BoxApp>
    </>
  );
}
