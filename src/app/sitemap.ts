import { MetadataRoute } from "next";

const baseUrl = "https://loja.iscaslune.com.br" as const;

export default function sitemap(): MetadataRoute.Sitemap {

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1,
        }
    ];
}