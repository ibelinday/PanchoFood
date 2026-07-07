export async function getCategoriesV3(query: string = ""): Promise<string[]> {
    // El dominio world.openfoodfacts.org es el estándar
    const BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ?? "https://world.openfoodfacts.org/api";
    const apiHost = BASE_URL.endsWith("/api") ? BASE_URL.replace(/\/api$/, "") : BASE_URL;
    const baseUrl = `${apiHost}/v3/taxonomy_suggestions`;

    const params = new URLSearchParams({
        tagtype: "categories",
        lc: "es",
        string: query,
        limit: "20",
    });
    // tagtype=categories&lc=es&string={query}&limit=20

    const response = await fetch(`${baseUrl}?${params.toString()}`, {
        headers: {
            "User-Agent": "UNTDF TNT 2026", // OFF
        },
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.suggestions as string[];
}