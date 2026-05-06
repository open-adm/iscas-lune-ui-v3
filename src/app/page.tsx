"use client";

import { useBannerApi } from "@/api/UseBannerApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { rotas } from "@/config/ConfigRotas";
import { useApi } from "@/hooks/UseApi";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { ICategoria } from "@/types/Categoria";
import { BannerView } from "@/view/home/BannerView";
import { CategoriaView } from "@/view/home/CategoriaView";
import { useEffect, useState } from "react";

export default function Home() {
  const apiBanner = useBannerApi();
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const apiListCategorias = useApi({
    method: "GET",
    url: "ecommerce/categorias/home",
    statusInicial: "loading",
  });
  const { backgroundColor } = useThemeApp();
  const { navigate } = useNavigateApp();

  async function init() {
    const response = await apiListCategorias.action<ICategoria[]>();
    setCategorias(response || []);
  }

  useEffect(() => {
    init();
  }, []);

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
