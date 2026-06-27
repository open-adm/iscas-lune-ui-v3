"use client";

import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { useSnackbar } from "@/components/SnackBar/UseSnackBar";
import { AppAuthProvider } from "@/context/AppAuthContext";
import { AppCarrinhoProvider } from "@/context/AppCarrinhoContext";
import { CategoriasProvider } from "@/context/AppCategoriaContext";
import { AppThemeProvider } from "@/context/AppThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
    const Snack = useSnackbar();

    return (
        <AppThemeProvider>
            <AppAuthProvider>
                <CategoriasProvider>
                    <AppCarrinhoProvider>
                        <Snack.Componet />
                        <div className="container-div">
                            <Header />
                            <main className="container-main">{children}</main>
                            <Footer />
                        </div>
                    </AppCarrinhoProvider>
                </CategoriasProvider>
            </AppAuthProvider>
        </AppThemeProvider>
    );
}