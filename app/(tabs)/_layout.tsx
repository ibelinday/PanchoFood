import { ThemeProvider, useTheme } from "@/src/components/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Platform } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
    const { colors } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#ffffff",  // Color del ícono y texto cuando la pestaña está activa
                tabBarInactiveTintColor: "rgba(255, 255, 255, 0.4)",
                // Oculta las etiquetas de texto si solo quieres dejar los íconos como en la foto
                tabBarShowLabel: false,
                tabBarStyle: [
                    styles.tabBar,
                    {
                        bottom: Platform.OS === 'ios' ? 25 : 15,
                        marginLeft: 20,
                        marginRight: 20,
                    }
                ],
                sceneStyle: {
                    paddingBottom: 80,
                    backgroundColor: colors.fondo,
                }
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

            <Tabs.Screen
                name="categorias/[nombre]"
                options={{
                    href: null
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        height: 65,
        borderRadius: 35,
        borderTopWidth: 0,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        backgroundColor: "#c944a3",
        // Empuja los íconos un poco para abajo en iOS para que queden centrados visualmente
        paddingTop: Platform.OS === 'ios' ? 12 : 0,
    }
});