import { EtiquetaLista } from "@/src/components/EtiquetaLista";
import ListBlock from "@/src/components/ListBlock";
import { MarcasCarousel } from "@/src/components/MarcasCarousel";
import Texto from "@/src/components/Texto";
import { categorias } from "@/src/data/categorias";
import { etiquetas } from "@/src/data/etiquetas";
import { marcas } from "@/src/data/marcas";
import { AppRoute, buildRoute, ROUTES } from "@/src/navigation/routes";
import GridCategorias from "@/src/screens/categorias/GridCategorias";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import "react-native-reanimated";

export default function IndexScreen() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            <GridCategorias
                title="Categorias"
                items={categorias}
                route={ROUTES.CATEGORIA}
            />
            <MarcasCarousel
                // title="Marcas"
                items={marcas}
                onPress={(id) => router.push(buildRoute(ROUTES.MARCA, { nombre: id }))}
            />
            <SeccionEtiquetas
                title="Etiquetas"
                items={etiquetas}
                route={ROUTES.ETIQUETA}
            />
        </ScrollView>
    );
}

type ListItem = {
    id: string;
    nombre: string;
};

type SectionListProps = {
    title: string;
    items: ListItem[];
    route: AppRoute;
};

const SeccionEtiquetas = ({ title, items, route }: SectionListProps) => {
    const router = useRouter();

    const navToItem = (item: ListItem) => {
        router.push(buildRoute(route, { nombre: item.id }));
    };

    return (
        <ListBlock>
            <Texto contenido={title} tipo="titulo" />
            <View style={styles.itemsContainer}>
                {items.map((item) => (
                    <EtiquetaLista
                        key={item.id}
                        nombre={item.nombre}
                        onPress={() => navToItem(item)}
                    />
                ))}
            </View>
        </ListBlock>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    itemsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
});