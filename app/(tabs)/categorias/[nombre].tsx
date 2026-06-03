import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";

// Componentes
import BackButton from "@/src/components/BackButton";
import Buscador from "@/src/components/Buscador";
import Producto from "@/src/components/Producto";
import Texto from "@/src/components/Texto";

// Hooks y Utils
import { useProductos } from "@/src/hooks/useProductos";
import { transformCategoriaNombre } from "@/src/transformers/categoria-nombre.transformer";

export default function ScreenCategoria() {
    const { nombre } = useLocalSearchParams();
    const categoria = typeof nombre === "string" ? nombre : "Sin nombre";
    const nombreFormateado = transformCategoriaNombre(categoria);

    // Estado y Hooks
    const { data: productos } = useProductos(categoria);
    const [busqueda, setBusqueda] = useState("");

    const cantResultados = useMemo(() => {
        if (!productos) return 0;
        return productos.count;
    }, [productos]);

    return (
        <View style={styles.pantalla}>
            <Stack.Screen
                options={{
                    title: nombreFormateado,
                    headerTitleStyle: { color: "#ffffff" },
                    headerShown: true,
                    headerStyle: { backgroundColor: "#c944a3" },
                    headerLeft: () => <BackButton color="#ffffff" />
                }}
            />

            <View style={styles.cabeceraBuscador}>
                <StatusBar barStyle="light-content" />
                <Texto contenido={`Productos encontrados ${cantResultados}`} tipo="cuerpo" />
                <Buscador
                    placeholder="Buscar alimentos o recetas..."
                    value={busqueda}
                    onChangeText={setBusqueda}
                />
            </View>

            {productos && productos.products && productos.products.length > 0 ? (
                <FlatList
                    data={productos.products}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }: { item: any }) => (
                        // 🌟 Le pasamos los datos exactos que pide tu componente
                        <Producto
                            id={item.id}
                            nombre={item.name || item.product_name}
                            marca={`ID: ${item.id}`}
                        />
                    )}
                    contentContainerStyle={styles.listaPadding}
                />

            ) : (
                <Text style={styles.textoVacio}>
                    No se encontraron productos en esta categoría.
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: "#F5F6F7",
    },
    cabeceraBuscador: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        marginBottom: 8,
    },
    listaPadding: {
        paddingBottom: 20,
        paddingHorizontal: 14,
    },
    textoVacio: {
        padding: 20,
        textAlign: 'center',
        color: '#64686f',
    }
});