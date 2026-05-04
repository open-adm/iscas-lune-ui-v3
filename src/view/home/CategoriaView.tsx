import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { CardProduto } from "@/components/CardProduto/CardProduto";
import { GridApp } from "@/components/Grid/GridApp";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { ICategoria } from "@/types/Categoria";

interface propsCategoriaView {
  categorias: ICategoria[];
}

export function CategoriaView(props: propsCategoriaView) {
  const { backgroundColor, borderRadius } = useThemeApp();
  const { navigate } = useNavigateApp();
  if (props.categorias.length === 0) {
    return <></>;
  }

  return (
    <BoxApp padding="1rem" backgroundColor={backgroundColor.card}>
      {props.categorias.map((categoria) => (
        <BoxApp key={categoria.id}>
          <BoxApp
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="1rem"
            marginTop="1rem"
          >
            <TextApp fontSize="18px" titulo={categoria.descricao} />
            <Button
              title="visualizar"
              endIcon={listaDeIcones.flechaDireita}
              onClick={() => navigate(`${rotas.categoria}/${categoria.id}`)}
            />
          </BoxApp>
          <GridApp container spacing={3}>
            {categoria.produtos?.map((produto) => (
              <GridApp key={produto.id} xs={12} sm={4}>
                <CardProduto produto={produto} desabilitarBtnAddCarrinho />
              </GridApp>
            ))}
          </GridApp>
        </BoxApp>
      ))}
    </BoxApp>
  );
}
