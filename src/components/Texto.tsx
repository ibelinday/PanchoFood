import { StyleSheet, Text } from "react-native";

type Props = {
    contenido: string
    tipo?: "titulo" | "cuerpo"

}

export default function Texto(props: Props) {
    return (
        <Text style={styles[props.tipo || "deafault"]}>
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
    deafault: {
        fontSize: 15,
    },
})