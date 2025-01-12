import { useApi } from "@/hooks/UseApi";
import { IBanner } from "@/types/Banner";
import { StatusRequisicao } from "@/types/StatusRequisicao";
import { useEffect, useState } from "react";

export function useBannerApi() {
  const [status, setStatus] = useState<StatusRequisicao>();
  const [banners, setBanners] = useState<IBanner[]>([]);
  const apiBanner = useApi({
    method: "GET",
    url: "banners/list",
  });

  async function listarBanners() {
    setStatus("loading");
    const response = await apiBanner.action<IBanner[]>();
    if (response) {
      setBanners(response);
      setStatus("success");
      return;
    }

    setStatus("error");
  }

  useEffect(() => {
    listarBanners();
  }, []);

  return {
    banners,
    status,
  };
}
