import { buildRoute, fichaShowRoute, ROUTES } from "@/src/navigation/routes";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function ClasesTabScreeen() {
    const router = useRouter();

    const navToAlimento = () => {
        router.push(buildRoute(ROUTES.ALIMENTO));
    };

    const navToFormulario1 = () => {
        router.push(buildRoute(ROUTES.FORMULARIO_PASO_1));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Pressable
                onPress={navToAlimento}
                style={[styles.card, styles.greenCard]}
            >
                <Text style={styles.cardText}>Ruta no existe</Text>
            </Pressable>
            <Pressable
                onPress={navToFormulario1}
                style={[styles.card, styles.blueCard]}
            >
                <Text style={styles.cardText}>Formulario c/pasos</Text>
            </Pressable>
            <Pressable
                onPress={() => router.push(fichaShowRoute(123))}
                style={[styles.card, styles.blueCard]}
            >
                <Text style={styles.cardText}>
                    <AntDesign name="file-done" size={24} color="black" />
                    {" Ficha 123"}
                </Text>
            </Pressable>
            {/* <Pressable
                onPress={() => router.push(ROUTES.LISTA_FLATLIST)}
                style={[styles.card, styles.blueCard]}
            >
                <Text style={styles.cardText}>Flatlist</Text>
            </Pressable>
            <Pressable
                onPress={() => router.push(ROUTES.SIMPLE_STATE)}
                style={[styles.card, styles.blueCard]}
            >
                <Text style={styles.cardText}>Simple State</Text>
            </Pressable>
            <Pressable
                onPress={() => router.push(ROUTES.INPUT_FILTER)}
                style={[styles.card, styles.blueCard]}
            >
                <Text style={styles.cardText}>Input Filter</Text>
            </Pressable>
            <Pressable
                onPress={() => router.push(ROUTES.FORMULARIO_EJEMPLO)}
                style={[styles.card, styles.blueCard]}
            >
                <Text style={styles.cardText}>Inputs formulario</Text>
            </Pressable>
            <Pressable
                onPress={() => router.push(ROUTES.FETCH_INDEX)}
                style={[styles.card, styles.blueCard]}
            >
                <Text style={styles.cardText}>Fetch</Text>
            </Pressable>
            <Pressable
                onPress={() => router.push(ROUTES.IMAGEN_GRADIENTE)}
                style={[styles.card, styles.blueCard]}
            >
                <Text style={styles.cardText}>Imagen Gradientes</Text>
            </Pressable> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
        gap: 12,
        backgroundColor: "#eff6ff",
    },
    quickActions: {
        width: "100%",
        alignItems: "center",
        gap: 10,
    },
    card: {
        width: "90%",
        minHeight: 90,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    greenCard: {
        backgroundColor: "green",
    },
    blueCard: {
        backgroundColor: "lightblue",
    },
    orangeCard: {
        backgroundColor: "#f59e0b",
    },
    cardText: {
        fontSize: 24,
        fontWeight: "700",
    },
    listBlock: {
        width: "100%",
        maxWidth: 420,
        gap: 12,
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