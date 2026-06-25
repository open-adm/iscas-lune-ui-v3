"use client";

import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { useSnackbar } from "@/components/SnackBar/UseSnackBar";
import { AppAuthProvider } from "@/context/AppAuthContext";
import { AppCarrinhoProvider } from "@/context/AppCarrinhoContext";
import { CategoriasProvider } from "@/context/AppCategoriaContext";
import { AppThemeProvider } from "@/context/AppThemeContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Snack = useSnackbar();
  return (
    <html lang="pt-BR">
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="b66396f6-cb57-4d43-9343-b298b1ee5b43"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <title>{`Iscas lune - Ecommerce`}</title>
        <meta
          name="description"
          content={`Iscas lune – Ecommerce – iscas artificiais.`}
        />
      </head>
      <AppThemeProvider>
        <AppAuthProvider>
          <CategoriasProvider>
            <AppCarrinhoProvider>
              <body className="body-principal">
                <Snack.Componet />
                <div className="container-div">
                  <Header />
                  <main className="container-main">{children}</main>
                  <Footer />
                </div>
              </body>
            </AppCarrinhoProvider>
          </CategoriasProvider>
        </AppAuthProvider>
      </AppThemeProvider>
    </html>
  );
}
