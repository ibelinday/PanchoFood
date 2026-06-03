import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
    children: ReactNode
};

export default function ListBlock({ children }: Props) {
    return (
        <View style={styles.listBlock}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    listBlock: {
        width: "100%",
        maxWidth: 420,
        gap: 12,
    },
});