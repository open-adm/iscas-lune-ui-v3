import { BoxApp } from "../Box/BoxApp";
import { ImageApp } from "../Image/ImageApp";
import styled from "./CarProduto.module.css";

interface propsFotoCard {
  backgroundColor: string;
  foto: string;
  descricao: string;
  borderRadius: string;
  width: string;
}

export function CardFoto(props: propsFotoCard) {
  return (
    <BoxApp
      padding=".5rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor={props.backgroundColor}
      width={props.width}
      borderRadius={props.borderRadius}
    >
      <ImageApp
        className={styled.cardproduto}
        src={props.foto}
        alt={props.descricao}
        height={150}
        width={200}
      />
    </BoxApp>
  );
}
