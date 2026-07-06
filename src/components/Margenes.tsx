import { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { useTheme } from "./ThemeProvider";

type Props = {
    children: ReactNode;
}

export function Margenes({ children }: Props) {
    const safeArea = useSafeAreaInsets();
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ 
                height: safeArea.top, 
                backgroundColor: colors.principal }} />
            {children}
            <View style={{ 
                height: safeArea.bottom, 
                backgroundColor: colors.fondo }} />
        </View>
    );

}