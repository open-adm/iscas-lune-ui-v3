"use client";

import { BoxApp } from "@/components/Box/BoxApp";
import { CategoriaView } from "@/view/home/CategoriaView";
import { HomeView } from "@/view/home/HomeView";

export default function Home() {

  return (
    <BoxApp height="100%" padding="0rem 1rem">
      <HomeView />
      <CategoriaView />
      {/* <LojasParceirasView /> */}
    </BoxApp>
  );
}
