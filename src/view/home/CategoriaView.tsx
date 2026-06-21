import { BoxApp } from "@/components/Box/BoxApp";
import { GridApp } from "@/components/Grid/GridApp";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { useCategoriasContext } from "@/context/hooks/UseCategoriaContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { Box, Card, Typography } from "@mui/material";

export function CategoriaView() {
  const { cores, backgroundColor } = useThemeApp();
  const { navigate } = useNavigateApp();
  const { categorias } = useCategoriasContext()

  if (categorias.length === 0) {
    return <></>;
  }

  return (
    <>
      <BoxApp marginBottom="1rem">
        <TextApp color={cores.primary.main} titulo="Explore" />
        <TextApp fontSize="26px" fontWeight={600} titulo="Categorias" />
      </BoxApp>
      <GridApp container spacing={2}>
        {categorias.map((categoria) => (
          <GridApp xs={12} sm={3} md={4} key={categoria.id}>
            <Card
              onClick={() => navigate(`${rotas.categoria}/${categoria.id}`)}
              sx={{
                position: "relative",
                overflow: "hidden",
                height: 150,
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: `${backgroundColor.default}`,
                border: "1px solid rgba(255, 215, 0, 0.4)",
                borderRadius: 2,
                cursor: "pointer",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  transition: "opacity .4s ease",
                  background: `
                  radial-gradient(
                    circle 400px at bottom right,
                    rgba(255, 215, 0, 0.18) 0%,
                    rgba(255, 215, 0, 0.08) 35%,
                    transparent 70%
                  )
                `,
                },

                "&:hover::before": {
                  opacity: 1,
                },

                "&:hover .content": {
                  transform: "translateY(-16px)",
                },

                "&:hover .explore": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              }}
            >
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 10,
                  letterSpacing: 2,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {categoria.quantidadeDeProdutos} Itens
              </Typography>

              <Box
                className="content"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  transition: "transform .3s ease",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: '16px'
                  }}
                >
                  {categoria.descricao}
                </Typography>

                <Typography
                  className="explore"
                  sx={{
                    fontSize: '14px',
                    color: cores.primary.main,
                    fontWeight: 600,
                    opacity: 0,
                    transform: "translateY(12px)",
                    transition: "all .3s ease",
                  }}
                >
                  Explorar →
                </Typography>
              </Box>
            </Card>
          </GridApp>
        ))}
      </GridApp>
    </>
  );
}
