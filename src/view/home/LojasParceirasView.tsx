import { useLojaParceiraApi } from "@/api/UseLojaParceiraApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import { ILojasParceiras } from "@/types/LojaParceira";
import { useEffect, useState } from "react";

export function LojasParceirasView() {
    const [lojas, setLojas] = useState<ILojasParceiras[]>([]);
    const { todasLojas } = useLojaParceiraApi();
    const { cores } = useThemeApp();

    async function init() {
        const response = await todasLojas.fetch()
        setLojas(response || [])
    }

    useEffect(() => {
        init()
    }, [])

    const loading = todasLojas.status === "loading"

    if (loading) {
        return (
            <BoxApp
                display="flex"
                gap='1rem'
                overflowx="auto"
                overflowy="hidden"
                maxWidth="750px"
                marginTop="1rem"
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <BoxApp
                        key={index}
                    >
                        <SkeletonCard widthCard="300px" heightCard="300px" />
                    </BoxApp>
                ))}
            </BoxApp>
        )
    }

    return <>
        {lojas.length > 0 && (
            <>
                <BoxApp marginBottom="1rem" marginTop="1rem">
                    <TextApp color={cores.primary.main} titulo="Explore" />
                    <TextApp fontSize="26px" fontWeight={600} titulo="Lojas parceiras" />
                </BoxApp>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        maxWidth: "750px",
                        overflowX: "auto",
                        overflowY: "hidden",
                        pb: 1,
                        marginTop: "1rem"
                    }}
                >
                    {lojas.map((loja) => (
                        <Box
                            key={loja.id}
                            sx={{
                                flexShrink: 0,
                            }}
                        >
                            <ParceiroCard parceiro={loja} />
                        </Box>
                    ))}
                </Box>
            </>
        )}
    </>;
}

import { IconApp } from "@/components/Icon/IconApp";
import { TextApp } from "@/components/Text/TextApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { maskPhone } from "@/utils/MaskPhone";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Link,
    Stack,
    Typography,
} from "@mui/material";

interface Parceiro {
    nomeFoto?: string;
    foto?: string;
    instagram?: string;
    facebook?: string;
    endereco?: string;
    contato?: string;
    nome: string;
}

interface Props {
    parceiro: Parceiro;
}

export function ParceiroCard({ parceiro }: Props) {
    return (
        <Card
            sx={{
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.2s",
                width: {
                    xs: 170,
                    sm: 190,
                    md: 210,
                },
                borderRadius: 2,
                "&:hover": {
                    boxShadow: 4,
                },
            }}
        >
            <CardMedia
                component="img"
                image={parceiro.foto || "/images/placeholder.jpg"}
                alt={parceiro.nome}
                sx={{
                    height: {
                        xs: 100,
                        sm: 110,
                        md: 120,
                    },
                    objectFit: "cover",
                }}
            />

            <CardContent
                sx={{
                    p: 1.2,
                    "&:last-child": { pb: 1.2 },
                }}
            >
                <Stack spacing={0.8}>
                    <Typography
                        fontWeight={600}
                        fontSize="0.9rem"
                        noWrap
                    >
                        {parceiro.nome}
                    </Typography>

                    {parceiro.endereco && (
                        <Stack direction="row" spacing={0.6} alignItems="center">
                            <IconApp icon="mdi:address-marker-outline" color="#FF5722" fontSize={'16px'} />
                            <Typography
                                noWrap
                                fontSize="0.75rem"
                                color="text.secondary"
                            >
                                {parceiro.endereco}
                            </Typography>
                        </Stack>
                    )}

                    {parceiro.contato && (
                        <Stack direction="row" spacing={0.6} alignItems="center">
                            <IconApp icon="mage:phone" color="#25D366" fontSize={'16px'} />
                            <Typography
                                fontSize="0.75rem"
                                color="text.secondary"
                            >
                                {maskPhone(parceiro.contato)}
                            </Typography>
                        </Stack>
                    )}

                    <Stack direction="row" spacing={0.5}>
                        {parceiro.instagram && (
                            <IconButton
                                component={Link}
                                href={parceiro.instagram}
                                target="_blank"
                                size="small"
                                sx={{ padding: 0.5 }}
                            >
                                <IconApp icon="mynaui:instagram" color="#E4405F" />
                            </IconButton>
                        )}

                        {parceiro.facebook && (
                            <IconButton
                                component={Link}
                                href={parceiro.facebook}
                                target="_blank"
                                size="small"
                                sx={{ padding: 0.5 }}
                            >
                                <IconApp icon="ic:outline-facebook" color="#1877F2" />
                            </IconButton>
                        )}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}