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
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";


async function llamarApi() {
    try {
        const respuesta = await fetch("http://localhost:8080/categorias.json");
        if (!respuesta.ok) {
            throw new Error("Error en la respuesta: " + respuesta.status);
        }
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.error("Error en la llamada a la API:", error);
    } finally {
        console.warn("Llamada a la API finalizada");

    }


}

export default function IndexScreen() {
    const safeArea = useSafeAreaInsets();
    const [data, setData] = useState("");

    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={[styles.container, { paddingTop: safeArea.top }]}>
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


const SeccionList = ({ title, items, route }: SectionListProps) => {
    const router = useRouter();

    const navToListItem = (item: ListItem) => {
        router.push(buildRoute(route, { nombre: item.id }));
    };

    return (
        <ListBlock>

            <Texto contenido={title} tipo="titulo" />
            {/* <Text style={styles.listTitle}>{title}</Text> */}
            <View style={styles.itemsContainer}>
                {items.map((item) => (
                    <Pressable
                        key={item.id}
                        onPress={() => navToListItem(item)}
                        style={styles.itemButton}
                    >
                        <Text style={styles.itemText}>{item.nombre}</Text>
                    </Pressable>
                ))}
            </View>
        </ListBlock>
    );
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
        paddingVertical: 49,
        paddingHorizontal: 30,
    },

    listTitle: {
        fontSize: 24,
        fontWeight: "700",
    },
    itemsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    itemButton: {
        backgroundColor: "#f0f4f8",
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 999,
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    itemText: {
        fontSize: 16,
    },
});