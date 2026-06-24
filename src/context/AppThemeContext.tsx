"use client";

import { DarkTheme } from "@/theme/DarkTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode, createContext } from "react";

interface IAppThemeProvider {
  children: ReactNode;
}

export const AppThemeContext = createContext({});

export function AppThemeProvider(props: IAppThemeProvider) {

  return (
    <AppThemeContext.Provider
      value={{
      }}
    >
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
