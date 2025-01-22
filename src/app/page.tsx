"use client";

import { useBannerApi } from "@/api/UseBannerApi";
import { useListarCategoriasApi } from "@/api/UseListarCategoriasApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { rotas } from "@/config/ConfigRotas";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { BannerView } from "@/view/home/BannerView";
import { CategoriaView } from "@/view/home/CategoriaView";

export default function Home() {
  const apiBanner = useBannerApi();
  const { categorias } = useListarCategoriasApi();
  const { backgroundColor } = useThemeApp();
  const { navigate } = useNavigateApp();

  return (
    <BoxApp height="100%" backgroundColor={backgroundColor.default}>
      <BannerView banners={apiBanner.banners} status={apiBanner.status} />
      <BoxApp
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent="center"
        padding="1rem"
        backgroundColor={backgroundColor.card}
      >
        <Button
          onClick={() => navigate(rotas.criarUsuario)}
          title="seja um revendedor LUNE"
          variant="contained"
        />
      </BoxApp>
      <CategoriaView categorias={categorias} />
    </BoxApp>
  );
}
