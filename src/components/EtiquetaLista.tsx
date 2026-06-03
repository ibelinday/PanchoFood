import { Pressable, StyleSheet, Text } from "react-native";

type EtiquetaListaProps = {
    nombre: string;
    onPress?: () => void;
};

export function EtiquetaLista({ nombre, onPress }: EtiquetaListaProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                { opacity: pressed ? 0.7 : 1 }
            ]}
        >
            <Text style={styles.text}>{nombre}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#dd9dd3",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: "#ce7eb1",
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        color: "#300b0b",
        textAlign: "center",
    },
});
