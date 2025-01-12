"use client";

import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { InputApp, MaskType } from "@/components/Input/InputApp";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { initialValues, schemaValidacao } from "./Configuracao";
import { useLoginApi } from "@/api/UseLoginApi";
import { useContext, useState } from "react";
import { clearMaskCpfCnpj } from "@/utils/MaskCpfCnpj";
import { AppAuthContext } from "@/context/AppAuthContext";

export function ViewLogin() {
  const [loading, setLoading] = useState(false);
  const { shadow, borderRadius, amarelo } = useThemeApp();
  const { navigate } = useNavigateApp();
  const { login } = useLoginApi();
  const { logar } = useContext(AppAuthContext);
  const form = useFormikAdapter({
    initialValues: initialValues,
    validationSchema: schemaValidacao,
    onSubmit: submit,
  });

  async function submit() {
    setLoading(true);
    const response = await login({
      ...form.values,
      cpfCnpj: clearMaskCpfCnpj(form.values.cpfCnpj),
    });
    if (response) {
      logar(response);
      navigate(rotas.home);
      return;
    }

    setLoading(false);
  }

  return (
    <form onSubmit={form.onSubmit}>
      <BoxApp
        boxShadow={shadow}
        borderRadius={borderRadius}
        padding="1rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="1rem"
        marginTop="1rem"
        height="calc(100vh - 100px)"
      >
        <TextApp
          titulo="Bem vindo a Iscas lune! 👋🏻"
          fontSize="18px"
          fontWeight={600}
        />
        <TextApp titulo="Por favor, efetue o login com suas credencias e começe as compras !" />
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          gap="1rem"
        >
          <InputApp
            fullWidth
            id="cpfCnpj"
            label="CPF/CNPJ"
            mask={MaskType.CPFCNPJ}
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("cpfCnpj")}
            helperText={form.helperText("cpfCnpj")}
            value={form.values.cpfCnpj}
            required
          />
          <InputApp
            required
            onChange={form.onChange}
            onBlur={form.onBlur}
            maxLength={20}
            error={form.error("senha")}
            helperText={form.helperText("senha")}
            value={form.values.senha}
            fullWidth
            id="senha"
            label="Senha"
            isPassword
          />
        </BoxApp>
        <BoxApp>
          <TextApp
            titulo="Esqueceu sua senha?"
            color={amarelo}
            fontWeight={600}
            cursor="pointer"
            onClick={() => navigate(rotas.esqueceuSenha)}
          />
        </BoxApp>
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          gap="1rem"
        >
          <Button
            fullWidth
            title="Login"
            loading={loading}
            type="submit"
            variant="contained"
            onClick={form.onSubmit}
          />
          <Button
            onClick={() => navigate(rotas.home)}
            fullWidth
            title="Voltar a tela inicial"
            variant="text"
          />
        </BoxApp>
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap="1rem"
        >
          <TextApp titulo="Ainda não tem conta?" />
          <TextApp
            titulo="Clique aqui!"
            color={amarelo}
            fontWeight={600}
            cursor="pointer"
            onClick={() => navigate(rotas.criarUsuario)}
          />
        </BoxApp>
      </BoxApp>
    </form>
  );
}
