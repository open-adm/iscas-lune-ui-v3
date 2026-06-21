"use client";

import { BoxApp } from "@/components/Box/BoxApp";
import { CategoriaView } from "../home/CategoriaView";

export function TodasCategorias() {

  return (
    <BoxApp width="100vw" maxWidth="750px">
      <CategoriaView />
    </BoxApp>
  );
}
