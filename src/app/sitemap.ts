import { MetadataRoute } from "next";

const baseUrl = "https://loja.iscaslune.com.br" as const;

export default function sitemap(): MetadataRoute.Sitemap {

    const categorias = [
        "Camarões",
        "Jig head 90°",
        "Bonés",
        "Camisas",
    ];

    const categoriasUrls = categorias.map((cat) => ({
        url: `${baseUrl}/produto/${cat}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/produto`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.8,
        },
        ...categoriasUrls
    ];
}