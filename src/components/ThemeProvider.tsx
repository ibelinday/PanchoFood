import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeContextType } from "../types/Theme";
import { paletaClaro } from "../data/paletaClaro";
import { paletaOscuro } from "../data/paletaOscuro";


export const ThemeContext = createContext<ThemeContextType>({
    colors: paletaClaro,
    theme: "light",
    toggleTheme: () => { },
});

type Props = {
    children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
    const [colors, setColors] = useState(paletaClaro);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            setColors(paletaOscuro);
        } else {
            setTheme("light");
            setColors(paletaClaro);
        }
    };

    return (
        <ThemeContext.Provider value={{ colors, theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
