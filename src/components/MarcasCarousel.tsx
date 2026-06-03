import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type MarcasCarouselProps = {
    items: { id: string; nombre: string }[];
    onPress: (id: string) => void;
};

const marcasColors = [
    { circle: "#60A5FA", text: "#FFFFFF" }, // Azul claro
    { circle: "#e32c2c", text: "#FFFFFF" }, // Rosa
    { circle: "#4919b8", text: "#FFFFFF" }, // Púrpura
    { circle: "#eda527", text: "#FFFFFF" }, // Ámbar
    { circle: "#10B981", text: "#FFFFFF" }, // Verde
    { circle: "#EF4444", text: "#FFFFFF" }, // Rojo
    { circle: "#06B6D4", text: "#FFFFFF" }, // Cyan
    { circle: "#6366F1", text: "#FFFFFF" }, // Índigo
];

export function MarcasCarousel({ items, onPress }: MarcasCarouselProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Marcas</Text>
                <Text style={styles.subtitle}>Explored through the lens of quality.</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                scrollEventThrottle={16}
            >
                {items.map((item, index) => {
                    const colors = marcasColors[index % marcasColors.length];
                    return (
                        <Pressable
                            key={item.id}
                            onPress={() => onPress(item.id)}
                            style={({ pressed }) => [
                                styles.card,
                                { opacity: pressed ? 0.8 : 1 }
                            ]}
                        >
                            <View style={styles.cardInner}>
                                <View
                                    style={[
                                        styles.circle,
                                        { backgroundColor: colors.circle }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.marcasText,
                                            { color: colors.text }
                                        ]}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                    >
                                        {item.nombre.substring(0, 8).toUpperCase()}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 16,
    },
    header: {
        paddingHorizontal: 16,
        gap: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1F2937",
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "500",
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 12,
        paddingBottom: 8,
    },
    card: {
        width: 110,
        height: 110,
        backgroundColor: "#F3F4F6",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    cardInner: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },
    marcasText: {
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
        paddingHorizontal: 8,
    },
});
