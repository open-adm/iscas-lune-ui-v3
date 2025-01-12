import { HashLoader } from "react-spinners";
import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "../Text/TextApp";

interface propsLoadingApp {
  marginTop?: string;
  height?: string;
  width?: string;
  texto?: string;
}

export function LoadingApp(props: propsLoadingApp) {
  return (
    <BoxApp
      width={props.width ?? "100%"}
      height={props.height ?? "100%"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="1rem"
      marginTop={props.marginTop}
    >
      <HashLoader />
      <TextApp titulo={props.texto ?? "Carregando..."} />
    </BoxApp>
  );
}
