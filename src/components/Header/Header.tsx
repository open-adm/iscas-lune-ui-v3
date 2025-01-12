"use client";

import { useState } from "react";
import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "../Text/TextApp";
import { MenuApp } from "../Menu/MenuApp";
import styled from "./Header.module.css";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { useNavigateApp } from "@/hooks/UseNavigateApp";

const fontSize = ".75rem";

export function Header() {
  const { backgroundColor, isMobile } = useThemeApp();
  const { navigate } = useNavigateApp();
  const [open, setOpen] = useState(false);

  function toogleOpen() {
    setOpen((state) => !state);
  }

  return (
    <>
      <MenuApp close={toogleOpen} open={open} />
      <header
        className={styled.headerMain}
        style={{ backgroundColor: backgroundColor.card }}
      >
        <TextApp
          titulo="Menu"
          cursor="pointer"
          hover={{ color: "#000000" }}
          onClick={toogleOpen}
        />
        <TextApp
          titulo="ISCAS LUNE"
          cursor="pointer"
          fontSize="18px"
          fontWeight={500}
          hover={{
            color: "#000000",
          }}
          onClick={() => navigate("/")}
        />
        <BoxApp display="flex" alignItems="center" gap=".5rem">
          {!isMobile && (
            <>
              <TextApp
                titulo="Pesquisar"
                fontSize={fontSize}
                cursor="pointer"
                hover={{ color: "#000000" }}
              />
              <TextApp
                titulo="Minha conta"
                fontSize={fontSize}
                cursor="pointer"
                hover={{ color: "#000000" }}
              />
            </>
          )}
          <TextApp
            titulo="Carrinho"
            fontSize={fontSize}
            cursor="pointer"
            hover={{ color: "#000000" }}
          />
        </BoxApp>
      </header>
    </>
  );
}
