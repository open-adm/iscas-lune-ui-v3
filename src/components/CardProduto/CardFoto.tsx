import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./CardFoto.module.css";

interface propsFotoCard {
  foto: string;
  descricao: string;
  borderRadius: string;
  width: string;
}

export function CardFoto(props: propsFotoCard) {
  const [orientacao, setOrientacao] = useState<"horizontal" | "vertical">();
  const [ampliada, setAmpliada] = useState(false);

  useEffect(() => {
    if (!ampliada) return;

    const fecharComEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAmpliada(false);
    };

    window.addEventListener("keydown", fecharComEscape);
    return () => window.removeEventListener("keydown", fecharComEscape);
  }, [ampliada]);

  return (
    <div
      style={{
        position: "relative",
        width: props.width || "100%",
        height: "200px",
        overflow: "hidden",
        borderRadius: "5px 5px 0 0",
        background: "#242424",
      }}
    >
      <Image
        src={props.foto}
        alt={props.descricao}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget;
          setOrientacao(naturalWidth > naturalHeight ? "horizontal" : "vertical");
        }}
        style={{
          objectFit: orientacao === "horizontal" ? "cover" : "contain",
          objectPosition: "center",
          cursor: "zoom-in",
        }}
        onClick={() => setAmpliada(true)}
      />
      <button
        type="button"
        aria-label={`Ampliar foto de ${props.descricao}`}
        onClick={() => setAmpliada(true)}
        className={styles.zoomButton}
      >
        +
      </button>
      {ampliada && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ampliada: ${props.descricao}`}
          onClick={() => setAmpliada(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1400,
            display: "grid",
            placeItems: "center",
            padding: "24px",
            background: "rgba(0,0,0,.88)",
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            aria-label="Fechar imagem ampliada"
            onClick={() => setAmpliada(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              border: 0,
              color: "#fff",
              background: "transparent",
              cursor: "pointer",
              fontSize: "36px",
            }}
          >
            ×
          </button>
          <Image
            src={props.foto}
            alt={props.descricao}
            width={1600}
            height={1200}
            sizes="(max-width: 768px) 100vw, 1400px"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "min(100%, 1400px)",
              maxHeight: "calc(100vh - 48px)",
              objectFit: "contain",
              cursor: "default",
            }}
          />
        </div>
      )}
    </div>
  );
}
