"use client";

import { rotas } from "@/config/ConfigRotas";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { useCategoriasContext } from "@/context/hooks/UseCategoriaContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { BoxApp } from "../Box/BoxApp";
import { Button } from "../Button/ButtonApp";
import { IconButtonTooltipApp } from "../Icon/IconButtonTooltipApp";
import { TextApp } from "../Text/TextApp";

export function Footer() {
  const { categorias } = useCategoriasContext();
  const { navigate } = useNavigateApp();

  return (
    <footer>
      <BoxApp
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
      >
        <BoxApp>
          <TextApp titulo="Iscas lune" fontWeight={600} fontSize="18px" />
        </BoxApp>
        <BoxApp>
          <TextApp titulo="Categorias" fontWeight={600} fontSize="18px" />
          <BoxApp display="flex" flexDirection="column">
            {categorias.map((categoria) => (
              <Button
                onClick={() => navigate(`${rotas.categoria}/${categoria.id}`)}
                key={categoria.id}
                title={categoria.descricao}
              />
            ))}
          </BoxApp>
        </BoxApp>
      </BoxApp>
      <BoxApp
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
      >
        <TextApp titulo={`Iscas Lune © ${new Date().getFullYear()}`} />
        <BoxApp>
          <IconButtonTooltipApp
            icon={listaDeIcones.whatsApp}
            titulo="WhatsApp"
            href="https://api.whatsapp.com/send?phone=554784574294&text=Olá, estou iniciando esta conversa através do site da Iscas Lune"
            cor="green"
            target="_blank"
          />
          <IconButtonTooltipApp
            icon={listaDeIcones.facebook}
            titulo="Facebook"
            href="https://www.facebook.com/luneiscas/"
            cor="#497ce2"
            target="_blank"
          />
          <IconButtonTooltipApp
            icon={listaDeIcones.instagram}
            titulo="Instagram"
            href="https://www.instagram.com/iscaslune/"
            cor="#db4437"
            target="_blank"
          />
        </BoxApp>
      </BoxApp>
    </footer>
  );
}
