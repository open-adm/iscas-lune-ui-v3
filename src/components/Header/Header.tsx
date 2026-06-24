"use client";

import { rotas } from "@/config/ConfigRotas";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { Badge, BadgeProps, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { BoxApp } from "../Box/BoxApp";
import { Button } from "../Button/ButtonApp";
import { IconApp } from "../Icon/IconApp";
import { MenuApp } from "../Menu/MenuApp";
import { MenuUsuarioApp } from "../MenuUsuario/MenuUsuarioApp";
import styles from "./Header.module.css";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export function Header() {
  const { backgroundColor } = useThemeApp();
  const { navigate } = useNavigateApp();
  const { quantidadeItensCarrinho } = useContext(AppCarrinhoContext);
  const [open, setOpen] = useState(false);

  function toogleOpen() {
    setOpen((state) => !state);
  }

  return (
    <>
      <MenuApp close={toogleOpen} open={open} />
      <header
        className={styles.headerMain}
        style={{
          backgroundColor: backgroundColor.card, boxShadow: "0 4px 24px rgba(0, 0, 0, .4)",
        }}
      >
        <Button title="Menu" onClick={toogleOpen} />
        <Button
          title="ISCAS LUNE"
          fontSize="1.2rem"
          onClick={() => navigate(rotas.home)}
        />
        <BoxApp display="flex" alignItems="center">
          <IconButton
            aria-label="cart"
            onClick={() => navigate(rotas.carrinho)}
          >
            <StyledBadge badgeContent={quantidadeItensCarrinho} color="primary">
              <IconApp icon={listaDeIcones.carrinho} />
            </StyledBadge>
          </IconButton>
          <MenuUsuarioApp />
        </BoxApp>
      </header >
    </>
  );
}
