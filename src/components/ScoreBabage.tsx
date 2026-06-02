import { StyleSheet, Text, View } from "react-native";



type StoreBadgeScore = {
    titulo: string;
    letra: string;
    colorFondo: string;
};

export default function ScoreBadge({ titulo, letra, colorFondo }: StoreBadgeScore) {
    return (

        <View style={styles.cajaScore}>
            {/* {titulo} */}
            <Text style={styles.scoreEtiqueta}>
                {titulo}
            </Text>
            <View style={[styles.cuadroLetra, { backgroundColor: colorFondo }]}>
                <Text style={styles.letraScore}>
                    {letra}
                </Text>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    cajaScore: {
        backgroundColor: "#F5F6F7",
        borderRadius: 12,
        padding: 12,
        flex: 1,
        alignItems: "center",
    },
    scoreEtiqueta: {
        fontSize: 10,
        color: "#666",
        textAlign: "center",
        marginBottom: 8,
        fontWeight: "600",
    },
    cuadroLetra: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    letraScore: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },

});
