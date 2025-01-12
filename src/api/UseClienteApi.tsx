import { useApi } from "@/hooks/UseApi";
import { IResponseLogin } from "@/types/ResponseLogin";
import { IUsuarioCreate } from "@/types/Usuario";

export function useClienteApi() {
  const apiCreate = useApi({
    method: "POST",
    url: "usuarios/create",
  });

  async function criarUsuario(
    body: IUsuarioCreate
  ): Promise<IResponseLogin | undefined> {
    return await apiCreate.action({ body });
  }

  return {
    criarUsuario,
  };
}
