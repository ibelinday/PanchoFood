
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";


type Props = {
    children: ReactNode;
}

export function Card({ children }: Props) {
    return (
        <View style={styles.cardContainer}>
            {children}
        </View>
    );
}


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 20,
        boxShadow: "0px 4px 6px hsla(333, 65%, 63%, 0.10)"
    },
});