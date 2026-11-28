import { formatMoney } from "@/utils/FormatMoney";
import { TextApp } from "../Text/TextApp";
import styles from "./CarProduto.module.css";

interface propsCardPesoTamanho {
  descricao: string;
  valorUnitario?: number;
  quantidade?: number;
  onChange: (qtd?: number) => void;
  onBlur?: () => void;
  temEstoqueDisponivel?: boolean;
  quantidadeEstoqueDisponivel?: number;
}

export function CardPesoTamanhoV2(props: propsCardPesoTamanho) {
  const estoque = props.quantidadeEstoqueDisponivel ?? 0;

  return (
    <div className={styles.linha}>
      <div className={styles.identificacao}>
        <span>{props.descricao}</span>
        {!props.temEstoqueDisponivel ? (
          <span className={styles.esgotado}>Esgotado</span>
        ) : estoque > 0 ? (
          <span className={styles.estoque}>
            {estoque} {estoque === 1 ? "disponível" : "disponíveis"}
          </span>
        ) : null}
      </div>
      {props.temEstoqueDisponivel ? (
        <input
          className={styles.quantidade}
          type="text"
          inputMode="numeric"
          aria-label={`Quantidade de ${props.descricao}`}
          placeholder="0"
          maxLength={10}
          value={props.quantidade ?? ""}
          onChange={(event) => {
            const digitos = event.currentTarget.value.replace(/\D/g, "");
            props.onChange(digitos ? Number(digitos) : undefined);
          }}
          onBlur={props.onBlur}
        />
      ) : (
        <input
          className={styles.quantidade}
          aria-label={`Quantidade de ${props.descricao}`}
          placeholder="—"
          disabled
        />
      )}
      <TextApp
        titulo={props.valorUnitario != null ? formatMoney(props.valorUnitario) : "—"}
        color={props.temEstoqueDisponivel ? "success" : "text.disabled"}
        fontWeight={600}
        textAlign="right"
      />
    </div>
  );
}
