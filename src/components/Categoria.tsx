import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, View } from "react-native"
import { transformCategoriaNombre } from "../transformers/categoria-nombre.transformer"
import Texto from "./Texto"

type Props = {
    nombre: string
    color?: string
    onPress: () => void;
}

export default function Categoria({ nombre, color = "#95A5A6", onPress }: Props) {
    const nombreFormateado = transformCategoriaNombre(nombre);

    return (
        <Pressable onPress={onPress} style={styles.contenedor}>
            <View style={[styles.cardMacro, { backgroundColor: color }]}>

                {/* Capa de luces y sombras superpuesta */}
                <LinearGradient
                    // Brillo blanco arriba a la izquierda, oscuro abajo a la derecha
                    colors={['rgba(255,255,255,0.3)', 'transparent', 'rgba(0,0,0,0.2)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[StyleSheet.absoluteFillObject, { borderRadius: 20 }]}
                />

                <Texto contenido={nombreFormateado} tipo="cuerpo" style={styles.cardText} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        width: "100%",
        aspectRatio: 1,
    },
    cardMacro: {
        flex: 1,
        backgroundColor: "#ccc",
        borderRadius: 20,
        padding: 15,
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },
    cardText: {
        color: "white",
        fontWeight: "bold",
        zIndex: 1,
    }
})