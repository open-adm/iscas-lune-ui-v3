import { IPrecoProduto } from "@/types/PrecoProduto";
import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "../Text/TextApp";
import { formatMoney } from "@/utils/FormatMoney";
import { Chip } from "@mui/material";
import { IconApp } from "../Icon/IconApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { InputApp, MaskType } from "../Input/InputApp";

interface propsCardPesoTamanho {
  descricao: string;
  id: string;
  precoProduto?: IPrecoProduto;
  onChange: (qtd?: number) => void;
  onBlur?: () => void;
}

export function CardPesoTamanho(props: propsCardPesoTamanho) {
  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="100%"
    >
      <TextApp titulo={props.descricao} width="100%" maxWidth="50px" />
      <InputApp
        label="QTD"
        width="100px"
        mask={MaskType.SOMENTE_NUMERO}
        id={`${props.id}`}
        value={props.precoProduto?.quantidade}
        onChange={(_, value) => props.onChange(value)}
        onBlur={props.onBlur}
        maxLength={10}
      />
      {props.precoProduto && (
        <Chip
          sx={{
            marginTop: ".3rem",
            width: "100px",
          }}
          size="small"
          icon={<IconApp icon={listaDeIcones.etiqueta} />}
          label={formatMoney(props.precoProduto.valorUnitario) ?? ""}
        />
      )}
    </BoxApp>
  );
}
