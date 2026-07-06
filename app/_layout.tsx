import { Margenes } from "@/src/components/Margenes";
import { ThemeProvider } from "@/src/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { View } from "react-native";


const queryClient = new QueryClient();

export default function RootLayout() {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Margenes>
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="productos/[id]"
                            options={{
                                headerShown: true,
                                title: "",
                            }}
                        />
                    </Stack>
                </Margenes>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
