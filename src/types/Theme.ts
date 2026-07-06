export interface ThemeColors {
    fondo: string;
    textoPrincipal: string;
    principal: string;

}

export interface ThemeContextType {
    colors: ThemeColors;
    theme: "light" | "dark";
    toggleTheme: () => void;
}