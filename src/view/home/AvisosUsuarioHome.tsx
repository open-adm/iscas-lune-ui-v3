import { useAvisoUsuarioApi } from "@/api/UseAvisoUsuarioApi";
import { Button } from "@/components/Button/ButtonApp";
import ModalApp from "@/components/Modal/ModalApp";
import { IAvisoUsuario } from "@/types/AvisoUsuario";
import { Box, Typography } from "@mui/material";
import { useEffect, useEffectEvent, useRef, useState } from "react";

export function AvisosUsuarioHome() {
  const { listarNaoLidos, marcarComoVisto, marcandoComoVisto } = useAvisoUsuarioApi();
  const [avisos, setAvisos] = useState<IAvisoUsuario[]>([]);
  const fechando = useRef(false);
  const aviso = avisos[0];

  const carregarAvisos = useEffectEvent(async () => {
    const resposta = await listarNaoLidos();
    if (resposta) setAvisos(resposta);
  });

  useEffect(() => {
    void carregarAvisos();
  }, []);

  async function fecharAviso() {
    if (!aviso || fechando.current) return;

    fechando.current = true;
    try {
      const resposta = await marcarComoVisto(aviso.id);
      if (resposta?.resultado) {
        setAvisos((atuais) => atuais.slice(1));
      }
    } finally {
      fechando.current = false;
    }
  }

  if (!aviso) return null;

  return (
    <ModalApp open close={fecharAviso} fullWidth maxWidth="sm">
      <Typography sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
        {aviso.mensagem}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          title="Fechar"
          variant="contained"
          loading={marcandoComoVisto}
          onClick={fecharAviso}
        />
      </Box>
    </ModalApp>
  );
}
