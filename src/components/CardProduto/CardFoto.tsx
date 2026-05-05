import Image from "next/image";

interface propsFotoCard {
  backgroundColor: string;
  foto: string;
  descricao: string;
  borderRadius: string;
  width: string;
}

export function CardFoto(props: propsFotoCard) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "220px",

    }}>
      <Image
        src={props.foto}
        alt={props.descricao}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: '5px 5px 0px 0px',
        }}
      />
    </div>
  );
}
