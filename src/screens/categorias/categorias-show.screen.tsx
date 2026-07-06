import { useProductos } from "@/src/hooks/useProductos";
import { ROUTES } from "@/src/navigation/routes";
import BackButton from "@/src/components/BackButton";
import Producto from "@/src/components/Producto";
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
            <Text style={styles.title}>{nombre}</Text>

            <FlatList
                data={data?.products}
                contentContainerStyle={{
                    width: "100%",
                }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Producto
                        id={item.id}
                        nombre={item.name}
                        marca={item.brands || "Sin marca"}
                        image_url={item.image_url}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginHorizontal: 16,
        marginTop: 16,
    },
});