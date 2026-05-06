import { ImageApp } from "@/components/Image/ImageApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { IBanner } from "@/types/Banner";
import { StatusRequisicao } from "@/types/StatusRequisicao";
import styles from "./BannerView.module.css";

interface propsBannerView {
  banners: IBanner[];
  status?: StatusRequisicao;
}

export function BannerView(props: propsBannerView) {
  if (props.banners.length === 0 && props.status !== "loading") {
    return <></>;
  }

  return (
    <>
      {props.status === "loading" && (
        <LoadingApp height="150px" width="100%" texto="Carregando banners..." />
      )}
      <div className={styles.carrossel}>
        <div className={styles.track}>
          {props.banners.map((banner, index) => (
            <ImageApp
              width={300}
              height={200}
              key={index}
              src={banner.foto}
              alt={index.toString()}
              className={styles.image}
            />
          ))}
          {props.banners.map((banner, index) => (
            <ImageApp
              width={300}
              height={200}
              key={index}
              src={banner.foto}
              alt={index.toString()}
              className={styles.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}
