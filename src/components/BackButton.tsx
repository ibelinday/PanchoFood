import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface BackButtonProps {
    color?: string;
    size?: number;
}

export default function BackButton({ color = "#ffffff", size = 24 }: BackButtonProps) {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
                styles.button,
                { opacity: pressed ? 0.6 : 1 }
            ]}
        >
            <Feather name="chevron-left" size={size} color={color} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        marginLeft: 12,
    }
});
