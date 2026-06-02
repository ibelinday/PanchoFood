import { StyleSheet, Text, View } from "react-native";

type NutricionItemProps = {
    titulo: string;
    valor: string;
};

export default function NutricionItem({ titulo, valor }: NutricionItemProps) {
    return (
        <View style={styles.cajaNutricion}>
            <Text style={styles.nutricionTitulo}>{titulo} </Text>
            <Text style={styles.nutricionValor}>{valor} </Text>


        </View>

    );

}

const styles = StyleSheet.create({
    cajaNutricion: {
        backgroundColor: "#D5E8D4",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 10,
        minWidth: 80,
    },
    nutricionTitulo: {
        fontSize: 10,
        color: "#1E5A32",
        fontWeight: "bold",
        marginBottom: 4,
    },
    nutricionValor: {
        fontSize: 14,
        color: "#111",


    },

});