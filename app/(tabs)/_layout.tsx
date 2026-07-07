import { useTheme } from "@/src/components/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const tabBarStyle = {
        ...styles.tabBar,
        height: Platform.OS === "ios" ? 56 + insets.bottom : 62,
        paddingBottom: Platform.OS === "ios" ? Math.max(insets.bottom - 2, 10) : 8,
        bottom: Platform.OS === "ios" ? -insets.bottom : 0,
    };

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#ffffff",
                tabBarInactiveTintColor: "rgba(255, 255, 255, 0.55)",
                tabBarShowLabel: false,
                tabBarStyle,
                sceneStyle: {
                    paddingBottom: 0,
                    backgroundColor: colors.fondo,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color, size }) => (
                        <Feather
                            name="home"
                            size={24}
                            color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favoritos"
                options={{
                    title: "Favoritos",
                    tabBarIcon: ({ color, size }) => (
                        <Feather
                            name="heart"
                            size={24}
                            color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="clases"
                options={{
                    title: "Clases",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="grid"
                            size={24}
                            color={color} />
                    ),
                }}
            />

            {/* La ruta dinámica de categoría no debe registrarse como pestaña fija */}
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 8,
        borderRadius: 0,
        borderTopWidth: 0,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        backgroundColor: "#a6517d",
    },
});