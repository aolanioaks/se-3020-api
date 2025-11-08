import React, { createContext, useContext, useMemo, useCallback } from "react";
import useAsyncStorageState from "../hooks/useAsyncStorage";


export type ThemeName = "midnight" | "ocean" | "forest" | "sunrise";


export type Theme = {
    name: ThemeName;
    background: string;
    card: string;
    text: string;
    subtext: string;
    primary: string;
    toggleBg: string;
    toggleActive: string;
    border: string;
    tabBarBg: string;
    headerBg: string;
    headerTint: string;
};


export const THEMES: Record<ThemeName, Theme> = {
midnight: {
    name: "midnight",
    background: "#000000",
    card: "#ffffff",
    text: "#111111",
    subtext: "#444444",
    primary: "#ff5ec4",
    toggleBg: "#f0f0f0",
    toggleActive: "#ff5ec4",
    border: "#cccccc",
    tabBarBg: "#000000",
    headerBg: "#000000",
    headerTint: "#ff5ec4",
},
ocean: {
    name: "ocean",
    background: "#0B132B",
    card: "#1C2541",
    text: "#E0E1DD",
    subtext: "#A9B1C6",
    primary: "#3A86FF",
    toggleBg: "#2B2D42",
    toggleActive: "#3A86FF",
    border: "#323C64",
    tabBarBg: "#0B132B",
    headerBg: "#0B132B",
    headerTint: "#3A86FF",
},
forest: {
    name: "forest",
    background: "#0F1E13",
    card: "#173D27",
    text: "#E6F2EA",
    subtext: "#B8D2C1",
    primary: "#2DC653",
    toggleBg: "#234C30",
    toggleActive: "#2DC653",
    border: "#2E5C3A",
    tabBarBg: "#0F1E13",
    headerBg: "#0F1E13",
    headerTint: "#2DC653",
},
sunrise: {
    name: "sunrise",
    background: "#FFF4EA",
    card: "#FFFFFF",
    text: "#3C2F2F",
    subtext: "#6B5E5E",
    primary: "#FF7B54",
    toggleBg: "#F1E3D6",
    toggleActive: "#FF7B54",
    border: "#E8D8C8",
    tabBarBg: "#FFE8D6",
    headerBg: "#FFE8D6",
    headerTint: "#FF7B54",
    },
};


const ThemeContext = createContext<{
    theme: Theme;
    setThemeByName: (name: ThemeName) => void;
    cycleTheme: () => void;
}>({ theme: THEMES.midnight, setThemeByName: () => {}, cycleTheme: () => {} });


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeName, setThemeName] = useAsyncStorageState<ThemeName>("pp.theme", "midnight");


    const theme = useMemo(() => THEMES[themeName] ?? THEMES.midnight, [themeName]);


    const setThemeByName = useCallback((name: ThemeName) => {
    setThemeName(name);
    }, [setThemeName]);


    const cycleTheme = useCallback(() => {
        const order: ThemeName[] = ["midnight", "ocean", "forest", "sunrise"];
        const currentTheme = order.indexOf(themeName);
        const next = order[(currentTheme + 1) % order.length];
        setThemeName(next);
        }, [themeName, setThemeName]);


    const value = useMemo(() => ({ theme, setThemeByName, cycleTheme }), [theme, setThemeByName, cycleTheme]);


    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};


export function useTheme() {
    return useContext(ThemeContext);
  }

export default useTheme;