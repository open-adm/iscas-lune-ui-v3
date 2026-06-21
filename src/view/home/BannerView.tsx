import { IconApp } from "@/components/Icon/IconApp";
import { IBanner } from "@/types/Banner";
import { StatusRequisicao } from "@/types/StatusRequisicao";
import { Box, Fade, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

interface propsBannerView {
  banners: IBanner[];
  status?: StatusRequisicao;
}

const interval = 5000

export function BannerView(props: propsBannerView) {
  const { banners } = props
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(timer);
  }, [interval, index]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 200, md: 350 },
        overflow: "hidden",
        borderRadius: 2,
        marginTop: "1rem"
      }}
    >
      {banners.map((banner, i) => (
        <Box key={`${i}`} sx={{ position: "absolute", inset: 0 }}>
          <Fade in={i === index} timeout={600}>
            <Image
              src={banner.foto}
              fill
              unoptimized
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: '5px 5px 0px 0px',
              }} alt={""} />
          </Fade>
        </Box>
      ))}

      {/* Botão left */}
      <IconButton
        onClick={prev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.4)",
          color: "#fff",
        }}
      >
        <IconApp icon={"icon-park-outline:left"} />

      </IconButton>

      {/* Botão right */}
      <IconButton
        onClick={next}
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.4)",
          color: "#fff",
        }}
      >
        <IconApp icon={"icon-park-outline:right"} />
      </IconButton>

      {/* Dots */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {banners.map((_, i) => (
          <IconButton key={i} onClick={() => setIndex(i)}>
            <IconApp icon={i === index ? "material-symbols-light:circle" : "material-symbols:circle-outline"} />
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
}
