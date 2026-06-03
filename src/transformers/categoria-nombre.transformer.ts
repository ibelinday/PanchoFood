export function transformCategoriaNombre(texto: string): string {
    return texto
        .split("-")
        .map((palabra, index) =>
            index === 0
                ? palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
                : palabra.toLowerCase()
        )
        .join(" "); // Usa " " para cambiar los guiones por espacios, o "-" si quieres mantener los guiones
};
