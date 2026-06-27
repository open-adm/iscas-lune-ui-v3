import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { IconApp } from "@/components/Icon/IconApp";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { Box, Typography } from "@mui/material";

export function HomeView() {
    const { navigate } = useNavigateApp()
    return (
        <Box sx={{ position: "relative", overflow: "hidden" }}>
            {/* BACKGROUND */}
            <Box sx={{ position: "absolute", inset: 0 }}>
                <Box
                    component="img"
                    src="https://storageiscaslune.blob.core.windows.net/iscaslune/3a7dd37d-e4c1-4c6c-85b0-42e04dd7c892.jpeg"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.25,
                        display: { xs: "none", md: "block" },
                    }}
                />

                {/* gradient overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, #1c1c1c, transparent)",
                    }}
                />

                {/* grid overlay (simulando bg-grid) */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.3,
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
            </Box>

            {/* CONTENT */}
            <Box
                sx={{
                    position: "relative",
                    maxWidth: "1200px",
                    mx: "auto",
                    px: 2,
                    pt: { xs: 6, sm: 10, lg: 14 },
                    pb: { xs: 10, sm: 14, lg: 18 },
                }}
            >

                {/* title */}
                {/* <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 900,
                        fontSize: { xs: 40, sm: 64, lg: 80 },
                        lineHeight: 0.95,
                        maxWidth: 700,
                    }}
                >
                    Iscas Lune
                </Typography> */}

                {/* subtitle */}
                <Typography
                    sx={{
                        mt: 3,
                        maxWidth: 500,
                        color: "text.secondary",
                        fontSize: { xs: 16, sm: 20 },
                        lineHeight: 1.6,
                    }}
                    variant="h1"
                >
                    Iscas artificiais de desenvolvimento próprio
                    <br />
                    criadas com foco em ação realista
                    <br />
                    resistência e desempenho para elevar sua experiência na pesca esportiva.
                </Typography>

                <BoxApp display="flex"
                    marginTop="1rem"
                    sx={{
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        gap: 2,
                    }}>
                    <Button endIcon="material-symbols-light:navigate-next" variant="contained" title="Comprar agora" onClick={() => navigate(rotas.produto)} />
                    <Button onClick={() => navigate(rotas.criarUsuario)}
                        title="Seja um revendedor LUNE" />
                </BoxApp>

                {/* cards */}
                <BoxApp
                    display="flex"
                    marginTop="1rem"
                    sx={{
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        gap: 2,
                    }}
                >
                    {[
                        { Icon: "line-md:security", label: "Compra segura", sub: "SSL & criptografia" },
                        { Icon: "eva:car-outline", label: "Entregas", sub: "para todo Brasil" },
                        { Icon: "twemoji:flag-brazil", label: "Fabricação", sub: "Nacional" },
                    ].map((item) => (
                        <Box
                            key={item.label}
                            sx={{
                                display: "flex",
                                gap: 2,
                                p: 2,
                                borderRadius: 2,
                                border: "1px solid rgba(255,255,255,0.1)",
                                bgcolor: "rgba(255,255,255,0.05)",
                                backdropFilter: "blur(10px)",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 1,
                                    display: "grid",
                                    placeItems: "center",
                                    bgcolor: "rgba(255,255,0,0.1)",
                                    color: "primary.main",
                                }}
                            >
                                <IconApp icon={item.Icon} fontSize={'12px'} />
                            </Box>

                            <BoxApp display="flex" flexDirection="column">
                                <TextApp titulo={item.label} fontWeight={600} fontSize="12px" />
                                <TextApp titulo={item.sub} fontSize="10px" color="text.secondary" />
                            </BoxApp>
                        </Box>
                    ))}
                </BoxApp>
            </Box>
        </Box >
    );
}