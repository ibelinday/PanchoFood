import Categoria from "@/src/components/Categoria";
import ListBlock from "@/src/components/ListBlock";
import Texto from "@/src/components/Texto";
import { AppRoute, buildRoute } from "@/src/navigation/routes";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

type ListItem = {
    id: string;
    nombre: string;
    color?: string;
};

type Props = {
    title: string
    items: ListItem[]
    route: AppRoute
};

export default function GridCategorias({ title, items, route }: Props) {
    const router = useRouter();

    const navToItem = (item: ListItem) => {
        router.push(buildRoute(route, { nombre: item.id }));
    };

    return (
        <ListBlock>
            <Texto contenido={title} tipo="titulo" />
            <View style={styles.gridContainer}>
                {items.map((item) => (
                    <View key={item.id} style={styles.gridItem}>
                        <Categoria
                            nombre={item.nombre}
                            color={item.color}
                            onPress={() => navToItem(item)}
                        />
                    </View>
                ))}
            </View>
        </ListBlock>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 15,
        width: "100%",
    },
    gridItem: {
        width: "47%",
    }
})
