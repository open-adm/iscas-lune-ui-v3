import { useApi } from "@/hooks/UseApi";
import { IAvisoUsuario, IResultadoAvisoUsuario } from "@/types/AvisoUsuario";

export function useAvisoUsuarioApi() {
  const listar = useApi({
    method: "GET",
    url: "/avisos-usuarios/meus/nao-lidos",
  });

  const marcar = useApi({
    method: "PUT",
    url: "/avisos-usuarios/meus/",
    naoRenderizarResposta: true,
  });

  return {
    listarNaoLidos: () => listar.action<IAvisoUsuario[]>(),
    marcarComoVisto: (id: string) =>
      marcar.action<IResultadoAvisoUsuario>({ urlParams: `${id}/visto` }),
    marcandoComoVisto: marcar.loading,
  };
}
