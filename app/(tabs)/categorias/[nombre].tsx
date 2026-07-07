import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Componentes
import BackButton from "@/src/components/BackButton";
import Buscador from "@/src/components/Buscador";
import Camara from "@/src/components/camara";
import Producto from "@/src/components/Producto";
import Texto from "@/src/components/Texto";

// Hooks y Utils
import { useProductos } from "@/src/hooks/useProductos";
import { transformCategoriaNombre } from "@/src/transformers/categoria-nombre.transformer";
import { useTheme } from "@/src/components/ThemeProvider";
import { fetchProductByCode } from "@/src/services/productos.service";
import { ROUTES, buildRoute } from "@/src/navigation/routes";

export default function ScreenCategoria() {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { nombre } = useLocalSearchParams();
    const categoria = typeof nombre === "string" ? nombre : "Sin nombre";
    const nombreFormateado = transformCategoriaNombre(categoria);

    // Estado y Hooks
    const {
        data: productos,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useProductos(categoria);
    const [busqueda, setBusqueda] = useState("");
    const [scannerVisible, setScannerVisible] = useState(false);
    const [tabBarHideProgress, setTabBarHideProgress] = useState(0);

    const productosLista = productos?.products ?? [];
    const productosFiltrados = useMemo(() => {
        const query = busqueda.trim().toLowerCase();
        if (!query) return productosLista;

        return productosLista.filter((item) => {
            const text = `${item.name || item.product_name || ""} ${item.brands || ""} ${item.code || ""}`.toLowerCase();
            return text.includes(query);
        });
    }, [busqueda, productosLista]);

    const cantResultados = productosFiltrados.length;

    const router = useRouter();

    const handleBarcodeScanned = async (value: string) => {
        // Cerramos el scanner inmediatamente
        setScannerVisible(false);

        // Intentamos buscar el producto directamente en la API por código
        try {
            const prod = await fetchProductByCode(value);
            if (prod) {
                const id = (prod._id || prod.id || value).toString();
                router.push(buildRoute(ROUTES.PRODUCTO, { id }));
                return;
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('Error buscando producto por código:', err);
        }

        // Si no lo encontramos via API, colocamos el código en el buscador como fallback
        setBusqueda(value);
    };

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const distanceToBottom = contentSize.height - (layoutMeasurement.height + contentOffset.y);
        const threshold = 180;
        const rawProgress = (threshold - distanceToBottom) / threshold;
        const nextProgress = Math.max(0, Math.min(1, rawProgress));
        const roundedProgress = Number(nextProgress.toFixed(2));

        setTabBarHideProgress((prev) => {
            if (prev === roundedProgress) return prev;
            return roundedProgress;
        });
    };

    useEffect(() => {
        const translateY = tabBarHideProgress * (Platform.OS === "ios" ? 110 : 84);
        const tabBarAnimatedStyle = {
            ...styles.tabBarBase,
            height: Platform.OS === "ios" ? 56 + insets.bottom : 62,
            paddingBottom: Platform.OS === "ios" ? Math.max(insets.bottom - 2, 10) : 8,
            bottom: Platform.OS === "ios" ? -insets.bottom : 0,
        };

        navigation.setOptions({
            tabBarStyle: [
                tabBarAnimatedStyle,
                {
                    transform: [{ translateY }],
                },
            ],
        });

        return () => {
            navigation.setOptions({ tabBarStyle: tabBarAnimatedStyle });
        };
    }, [insets.bottom, navigation, tabBarHideProgress]);

    return (
        <View style={styles.pantalla}>
            <Stack.Screen
                options={{
                    title: nombreFormateado,
                    headerTitleStyle: { color: colors.textoPrincipal },
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.principal },
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
                    onCameraPress={() => setScannerVisible(true)}
                />
            </View>
            <Camara
                visible={scannerVisible}
                onClose={() => setScannerVisible(false)}
                onScanned={handleBarcodeScanned}
            />

            {isLoading ? (
                <View style={styles.loadingWrapper}>
                    <ActivityIndicator size="large" color={colors.principal} />
                    <Text style={styles.textoVacio}>Cargando productos...</Text>
                </View>
            ) : isError ? (
                <View style={styles.loadingWrapper}>
                    <Text style={styles.textoVacio}>
                        No se pudieron cargar los productos.
                    </Text>
                    {error instanceof Error ? (
                        <Text style={styles.errorTexto}>{error.message}</Text>
                    ) : null}
                </View>
            ) : productos && productos.products && productos.products.length > 0 ? (
                <FlatList
                    data={productosFiltrados}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }: { item: any }) => (
                        <Producto
                            id={item.id}
                            nombre={item.name || item.product_name}
                            marca={item.brands || `ID: ${item.id}`}
                            image_url={item.image_url}
                        />
                    )}
                    contentContainerStyle={styles.listaPadding}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.4}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    ListFooterComponent={(
                        <View style={styles.footerContainer}>
                            {isFetchingNextPage ? (
                                <View style={styles.cargandoMasContainer}>
                                    <ActivityIndicator size="small" color={colors.principal} />
                                    <Text style={styles.footerText}>Cargando más...</Text>
                                </View>
                            ) : hasNextPage ? (
                                <Pressable style={styles.cargarMasButton} onPress={handleLoadMore}>
                                    <Text style={styles.cargarMasText}>Cargar más</Text>
                                </Pressable>
                            ) : (
                                <Text style={styles.footerText}>No hay más productos</Text>
                            )}
                        </View>
                    )}
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
    loadingWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    textoVacio: {
        padding: 20,
        textAlign: 'center',
        color: '#64686f',
    },
    errorTexto: {
        color: '#B00020',
        fontSize: 14,
        textAlign: 'center',
    },
    footerContainer: {
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    cargandoMasContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    cargarMasButton: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#d4d4d8",
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    cargarMasText: {
        color: "#191c1d",
        fontWeight: "700",
        fontSize: 14,
    },
    footerText: {
        color: '#64686f',
        fontSize: 13,
        textAlign: 'center',
    },
    tabBarBase: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 8,
        borderRadius: 0,
        borderTopWidth: 0,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        backgroundColor: "#c944a3",
    },
});