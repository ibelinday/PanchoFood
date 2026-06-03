import NutricionItem from "@/src/components/NurtricionItem";
import ScoreBadge from "@/src/components/ScoreBabage";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
// 🌟 Importamos esto para esquivar la isla/notch del iPhone
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ProductosShowScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const safeArea = useSafeAreaInsets(); // Calculamos los márgenes

    return (
        <View style={styles.pantalla}>
            {/* 🌟 BOTÓN DE VOLVER FLOTANTE A PRUEBA DE BALAS */}
            <Pressable
                onPress={() => router.back()}
                style={{
                    position: "absolute",
                    top: safeArea.top + 10,  // Lo bajamos para que no tape la hora
                    left: 20,
                    zIndex: 999,             // Garantiza que esté siempre al frente
                    backgroundColor: "rgba(0, 0, 0, 0.15)", // Un circulito sutil
                    padding: 8,
                    borderRadius: 50,
                }}
            >
                <Ionicons name="arrow-back" size={28} color="#ffffff" />
            </Pressable>

            {/* Le sacamos el style={styles.pantalla} al ScrollView porque ahora lo tiene el View padre */}
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.cabeceraFondo}>
                    <Text style={{ fontSize: 50 }}>🥛</Text>
                </View>
                <View style={styles.tarjetaBlanca}>
                    <View style={styles.botonFavoritoFlotante}>
                        <Ionicons name="heart" size={24} color={"#1e5A32"} />
                    </View>
                    <Text style={styles.textoMarca}>OATLY</Text>
                    <Text style={styles.textoTitulo}>the original Oalty</Text>
                    <View style={styles.filaScores}>
                        <ScoreBadge titulo="NUTRI-SCORE" letra="A" colorFondo="#0A8A43" />
                        <ScoreBadge titulo="NOVA GROUP" letra="1" colorFondo="#FFC107" />
                        <ScoreBadge titulo="ECO-SCORE" letra="A" colorFondo="#0A8A43" />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filaNutricion}>
                        <NutricionItem titulo="ENERGY" valor="193 kJ" />
                        <NutricionItem titulo="FAT" valor="1.5g" />
                        <NutricionItem titulo="PROTEIN" valor="1.0g" />
                        <NutricionItem titulo="SALT" valor="0.10g" />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: "#F5F6F7",

    },
    cabeceraFondo: {
        backgroundColor: "#ED6B5A",
        height: 350,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 40,

    },
    tarjetaBlanca: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -40,
        padding: 24,
        minHeight: 500,
    },
    botonFavoritoFlotante: {
        position: "absolute",
        top: -25,
        right: 24,
        backgroundColor: "#FFF",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textoMarca: {
        color: "#1E5A32",
        fontWeight: "bold",
        fontSize: 12,
        letterSpacing: 1,
        marginBottom: 8,
    },
    textoTitulo: {
        fontSize: 28,
        fontWeight: "900",
        color: "#111",
        marginBottom: 24,
    },
    filaScores: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 24,
    },
    filaNutricion: {
        flexDirection: "row",
    }

})