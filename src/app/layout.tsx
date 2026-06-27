import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://loja.iscaslune.com.br"),

  title: {
    default: "Iscas Lune | Iscas Artificiais para Pesca Esportiva",
    template: "%s | Iscas Lune",
  },

  description:
    "Fabricante de iscas artificiais para pesca esportiva. Conheça a linha completa de produtos Iscas Lune desenvolvidos para pescadores de todo o Brasil.",

  keywords: [
    "iscas artificiais",
    "pesca esportiva",
    "iscas para tucunaré",
    "iscas para robalo",
    "iscas de pesca",
    "Iscas Lune",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Iscas Lune",
    description:
      "Iscas artificiais para pesca esportiva.",
    url: "/",
    siteName: "Iscas Lune",
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="b66396f6-cb57-4d43-9343-b298b1ee5b43"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${poppins.className} body-principal`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
