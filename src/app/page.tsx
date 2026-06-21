"use client";

import { useBannerApi } from "@/api/UseBannerApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { rotas } from "@/config/ConfigRotas";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { BannerView } from "@/view/home/BannerView";
import { CategoriaView } from "@/view/home/CategoriaView";
import { LojasParceirasView } from "@/view/home/LojasParceirasView";

export default function Home() {
  const apiBanner = useBannerApi();
  const { navigate } = useNavigateApp();


  return (
    <BoxApp height="100%" padding="1rem">
      <BannerView banners={apiBanner.banners} status={apiBanner.status} />
      <BoxApp
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent="center"
        padding="1rem"
      >
        <Button
          onClick={() => navigate(rotas.criarUsuario)}
          title="seja um revendedor LUNE"
          variant="contained"
        />
      </BoxApp>
      <CategoriaView />
      <LojasParceirasView />
    </BoxApp>
  );
}
