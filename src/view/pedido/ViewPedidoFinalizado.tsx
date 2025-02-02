"use client";

import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { TextApp } from "@/components/Text/TextApp";
import { useNavigateApp } from "@/hooks/UseNavigateApp";

export function ViewPedidoFinalizado() {
  const { navigate } = useNavigateApp();
  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="1rem"
      padding="1rem"
    >
      <TextApp titulo="A Iscas Lune agradece o seu pedido!" />
      <TextApp titulo="Assim que iniciarmos o processo de produção," />
      <TextApp
        titulo="entraremos em contato pelo telefone cadastrado para informar os próximos
        passos."
      />
      <TextApp titulo="Qualquer dúvida, estamos à disposição!" />
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        title="Voltar para tela inicial"
      />
    </BoxApp>
  );
}
