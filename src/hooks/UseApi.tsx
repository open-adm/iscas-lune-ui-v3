"use client";

import axios, { GenericAbortSignal } from "axios";
import { useEffect, useRef } from "react";
import { keysLocalStorage } from "@/config/keysLocalStorage";
import { useLocalStorage } from "./UseLocalStorage";
import { useSnackbar } from "@/components/SnackBar/UseSnackBar";

export type TypeMethod = "GET" | "POST" | "PUT" | "DELETE";
interface propsUseApi {
  method: TypeMethod;
  url: string;
  naoRenderizarErro?: boolean;
  naoRenderizarResposta?: boolean;
  header?: any;
}

interface propsFecth {
  body?: any;
  urlParams?: string;
  message?: string;
  signal?: GenericAbortSignal;
}

function getMessage(method: TypeMethod): string {
  switch (method) {
    case "DELETE":
      return "Registro excluido com sucesso!";
    case "PUT":
      return "Registro editado com sucesso!";
    default:
      return "Registro criado com sucesso!";
  }
}

export function useApi(props: propsUseApi) {
  //const { logout } = useAuth();
  const URL_API = process.env.NEXT_PUBLIC_URL_API;
  const snack = useSnackbar();
  const { getItem, setItem } = useLocalStorage();
  const abortControllerRef = useRef<any>(null);

  const api = axios.create({
    baseURL: URL_API,
  });

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  function erro(error: any) {
    snack.show("Ocorreu um erro interno, tente novamente mais tarde!", "error");
  }

  async function action<T = unknown>(
    propsFecth?: propsFecth
  ): Promise<T | undefined> {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      const jwt = getItem(keysLocalStorage.jwt);
      const refreshJwt = getItem(keysLocalStorage.refreshJwt);
      const meManterLogado = getItem(keysLocalStorage.lembrarCheckBox);
      const headers = {
        Authorization: `Bearer ${jwt ?? ""}`,
        RefreshToken: `${refreshJwt ?? ""}`,
        MeManterLogado: `${meManterLogado ?? ""}`,
        ...(props.header ?? {}),
      };
      const response = await api.request({
        url: propsFecth?.urlParams
          ? `${props.url}${propsFecth?.urlParams}`
          : props.url,
        data: propsFecth?.body,
        method: props.method,
        headers,
        signal,
      });
      const message = propsFecth?.message ?? getMessage(props.method);
      if (message && !props.naoRenderizarResposta && props.method !== "GET") {
        snack.show(message, "success");
      }
      const responseHeader = response.headers as any;
      if (responseHeader["novotoken"]) {
        setItem(keysLocalStorage.jwt, responseHeader["novotoken"]?.toString());
      }
      return response?.data as T;
    } catch (error: any) {
      if (error?.code === "ERR_CANCELED") {
        return undefined;
      }
      if (!props.naoRenderizarErro) {
        erro(error);
      }
      return undefined;
    }
  }

  return {
    action,
  };
}
