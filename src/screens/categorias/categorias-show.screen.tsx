import { useProductos } from "@/src/hooks/useProductos";
import { ROUTES } from "@/src/navigation/routes";
import BackButton from "@/src/components/BackButton";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

type CategoriaParams = {
    nombre: string;
};

export function CategoriasShowScreen() {
    const { nombre } = useLocalSearchParams<CategoriaParams>();
    const { data } = useProductos(nombre);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: nombre,
                headerLeft: () => <BackButton />
            }} />
            <Text style={styles.title}>Categoria</Text>
            <Text style={styles.value}>{nombre}</Text>
            <FlatList
                data={data?.products}
                contentContainerStyle={{
                    width: "100%",
                }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link
                        href={{ pathname: ROUTES.PRODUCTO, params: { id: item.id } }}>
                        <View
                            style={{ padding: 12 }}>
                            <Text style={{ fontSize: 18 }}>
                                {item.name} - {item.id}
                            </Text>
                        </View>
                    </Link>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
    },
    value: {
        fontSize: 20,
    },
});