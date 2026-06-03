import { Href } from "expo-router";

export const ROUTES = {
    HOME: "/", // /(tabs)/index
    TABS_FAVS: "/favoritos",
    TABS_CLASES: "/clases",
    ALIMENTO: "/alimento",
    FORMULARIO_PASO_1: "/formulario/paso1",
    FORMULARIO_PASO_2: "/formulario/paso2",
    CATEGORIA: "/categorias/[nombre]",
    MARCA: "/marcas/[nombre]",
    ETIQUETA: "/etiquetas/[nombre]",
    FICHA: "/ficha/[id]",
    LISTA_FLATLIST: "/ejemplos/lista-flatlist",
    SIMPLE_STATE: "/ejemplos/simple-state",
    INPUT_FILTER: "/ejemplos/input-filter",
    FETCH_INDEX: "/ejemplos/fetch",
    IMAGEN_GRADIENTE: "/ejemplos/imagen-gradientes",
    PRODUCTO: "/productos/[id]",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
type RouteParams = Record<string, string | number | boolean | undefined>;

export const buildRoute = (route: AppRoute, params?: RouteParams): Href => {
    if (!params) {
        return route as Href;
    }

    return {
        pathname: route,
        params,
    } as Href;
};

export function fichaShowRoute(id: number) {
    return buildRoute(ROUTES.FICHA, { id: id.toString() });
}