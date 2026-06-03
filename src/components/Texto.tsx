import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type Props = {
    contenido: string
    tipo?: "titulo" | "cuerpo"
    style?: StyleProp<TextStyle>;

}

export default function Texto(props: Props) {
    return (
        <Text style={[styles[props.tipo || "default"], props.style]}>
            {props.contenido}
        </Text>
    );
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
    },
    cuerpo: {
        fontSize: 20,
    },
    default: {
        fontSize: 15,
    },
})