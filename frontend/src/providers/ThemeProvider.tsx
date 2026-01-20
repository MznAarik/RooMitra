"use client";

import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

interface ThemeProviderProps {
    children: ReactNode;
}

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1976d2" },
        secondary: { main: "#dc004e" },
    },
});

export default function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
