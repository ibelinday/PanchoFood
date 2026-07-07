import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProductoFavorito = {
    id: string;
    nombre: string;
};

const FAVORITOS_KEY = "productosFavoritos";

export const guardarFavorito = async (producto: ProductoFavorito) => {
    const favoritos = await obtenerFavoritos();
    favoritos.push(producto);
    await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
    return true;
};

export const eliminarFavorito = async (productoId: string) => {
    let favoritos = await obtenerFavoritos();
    favoritos = favoritos.filter((favorito) => favorito.id !== productoId);
    await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
    return true;
};

export const obtenerFavoritos = async (): Promise<ProductoFavorito[]> => {
    const favoritos = await AsyncStorage.getItem(FAVORITOS_KEY);
    return favoritos ? JSON.parse(favoritos) : [];
};

export const obtenerFavorito = async (
    productoId: string,
): Promise<ProductoFavorito | null> => {
    const favoritos = await obtenerFavoritos();
    return favoritos.find((favorito) => favorito.id === productoId) ?? null;
};