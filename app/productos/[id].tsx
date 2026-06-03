import BackButton from "@/src/components/BackButton";
import { ProductosShowScreen } from "@/src/screens/productos/productos-show.screen";
import { Stack } from "expo-router";

export default function ProductosLayout() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Producto",
                    headerTitleStyle: { color: "#ffffff" },
                    headerShown: true,
                    headerStyle: { backgroundColor: "#ED6B5A" },
                    headerLeft: () => <BackButton color="#ffffff" />
                }}
            />
            <ProductosShowScreen />
        </>
    );
}
