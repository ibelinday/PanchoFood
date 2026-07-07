import NutricionItem from "@/src/components/NurtricionItem";
import ScoreBadge from "@/src/components/ScoreBabage";
import { fetchProductByCode } from "@/src/services/productos.service";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type DetailRowProps = {
    label: string;
    value: string;
    subtle?: boolean;
};

type ProductScores = {
    nutriLabel: string;
    nutriColor: string;
    novaLabel: string;
    novaColor: string;
    ecoLabel: string;
    ecoColor: string;
};

const HERO_COLOR = "#f7f7f8";
const BRAND_COLOR = "#0d662a";
const SURFACE = "#ffffff";
const SCREEN_BG = "#f5f6f7";
const TEXT_MUTED = "#6e7078";
const BORDER = "#ececef";
const ALERT_BG = "#fff2f2";
const ALERT_TEXT = "#c63a32";

function formatText(value?: string | null, fallback = "No disponible") {
    const trimmed = value?.trim();
    return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function formatNumber(value?: number | string | null, suffix = "") {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return `${value}${suffix}`.trim();
}

function getScoreColor(letter?: string | number | null) {
    const normalized = String(letter ?? "").toUpperCase();

    if (normalized === "A" || normalized === "A+") return "#11853f";
    if (normalized === "B" || normalized === "B+") return "#63a940";
    if (normalized === "C") return "#f2b705";
    if (normalized === "D") return "#f08a1e";
    if (normalized === "E") return "#de4e37";
    if (normalized === "1") return "#f2b705";
    if (normalized === "2") return "#f08a1e";
    if (normalized === "3" || normalized === "4") return "#de4e37";

    return "#c8ccd1";
}

function buildScores(product: any): ProductScores {
    const nutri = product?.nutriscore_grade?.toUpperCase?.() ?? product?.nutrition_grades?.toUpperCase?.() ?? "-";
    const nova = product?.nova_group ? String(product.nova_group) : "-";
    const eco = product?.ecoscore_grade?.toUpperCase?.() ?? "-";

    return {
        nutriLabel: nutri,
        nutriColor: getScoreColor(nutri),
        novaLabel: nova,
        novaColor: getScoreColor(nova),
        ecoLabel: eco,
        ecoColor: getScoreColor(eco),
    };
}

function buildNutritionChips(product: any) {
    const nutriments = product?.nutriments ?? {};

    return [
        {
            title: "ENERGY",
            value: formatNumber(
                nutriments["energy-kj_100g"] ?? nutriments.energy_kj_100g ?? nutriments.energy_serving,
                " kJ",
            ),
        },
        {
            title: "FAT",
            value: formatNumber(nutriments.fat_100g ?? nutriments.fat, "g"),
        },
        {
            title: "PROTEIN",
            value: formatNumber(nutriments.proteins_100g ?? nutriments.proteins, "g"),
        },
        {
            title: "SALT",
            value: formatNumber(nutriments.salt_100g ?? nutriments.salt, "g"),
        },
    ];
}

function buildNutritionTable(product: any) {
    const nutriments = product?.nutriments ?? {};

    return [
        { label: "Energy", value: `${formatNumber(nutriments["energy-kcal_100g"] ?? nutriments.energy_kcal_100g, " kcal")} / ${formatNumber(nutriments["energy-kj_100g"] ?? nutriments.energy_kj_100g, " kJ")}` },
        { label: "Fat", value: formatNumber(nutriments.fat_100g ?? nutriments.fat, "g") },
        { label: "of which saturates", value: formatNumber(nutriments["saturated-fat_100g"] ?? nutriments.saturated_fat_100g, "g"), subtle: true },
        { label: "Carbohydrate", value: formatNumber(nutriments.carbohydrates_100g ?? nutriments.carbohydrates, "g") },
        { label: "of which sugars", value: formatNumber(nutriments.sugars_100g ?? nutriments.sugars, "g"), subtle: true },
        { label: "Fibre", value: formatNumber(nutriments.fiber_100g ?? nutriments.fiber, "g") },
        { label: "Protein", value: formatNumber(nutriments.proteins_100g ?? nutriments.proteins, "g") },
        { label: "Salt", value: formatNumber(nutriments.salt_100g ?? nutriments.salt, "g") },
    ];
}

function DetailRow({ label, value, subtle = false }: DetailRowProps) {
    return (
        <View style={[styles.detailRow, subtle && styles.detailRowSubtle]}>
            <Text style={[styles.detailLabel, subtle && styles.detailLabelSubtle]}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
}

export function ProductosShowScreen() {
    const { id } = useLocalSearchParams<{ id?: string | string[] }>();
    const productId = Array.isArray(id) ? id[0] : id;
    const router = useRouter();
    const insets = useSafeAreaInsets();

    if (!productId) {
        return (
            <SafeAreaView style={styles.loadingScreen}>
                <Text style={styles.errorTitle}>No se pudo cargar el producto</Text>
                <Text style={styles.errorText}>No se recibió el identificador del producto.</Text>
                <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
                    <Text style={styles.secondaryButtonText}>Volver</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    const productQuery = useQuery({
        queryKey: ["product-detail", productId],
        enabled: true,
        staleTime: 5 * 60 * 1000,
        queryFn: async () => {
            const product = await fetchProductByCode(productId);
            if (!product) {
                throw new Error("No se pudo obtener el detalle del producto.");
            }

            return product;
        },
    });

    const product = productQuery.data;
    const imageUrl =
        product?.image_front_url ||
        product?.image_url ||
        product?.image_front_small_url ||
        product?.image_small_url ||
        "";
    const title = formatText(product?.product_name, "Producto sin nombre");
    const brand = formatText(product?.brands, "Sin marca");
    const ingredients = formatText(product?.ingredients_text || product?.ingredients_text_with_allergens);
    const allergenInfo = formatText(product?.allergens_from_ingredients || product?.allergens || product?.traces, "Sin alertas registradas");
    const scores = buildScores(product);
    const nutritionChips = buildNutritionChips(product);
    const nutritionRows = buildNutritionTable(product);

    const handleShare = async () => {
        if (!product) return;

        const shareUrl = product.link || `https://world.openfoodfacts.org/product/${product.code}`;
        await Share.share({
            message: `${title} - ${shareUrl}`,
        });
    };

    if (productQuery.isLoading) {
        return (
            <SafeAreaView style={styles.loadingScreen}>
                <ActivityIndicator size="large" color={BRAND_COLOR} />
                <Text style={styles.loadingText}>Cargando producto...</Text>
            </SafeAreaView>
        );
    }

    if (productQuery.isError || !product) {
        return (
            <SafeAreaView style={styles.loadingScreen}>
                <Text style={styles.errorTitle}>No se pudo cargar el producto</Text>
                <Text style={styles.errorText}>
                    {productQuery.error instanceof Error ? productQuery.error.message : "Intenta nuevamente."}
                </Text>
                <Pressable style={styles.retryButton} onPress={() => productQuery.refetch()}>
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </Pressable>
                <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
                    <Text style={styles.secondaryButtonText}>Volver</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.screen}>
            <View style={[styles.hero, { paddingTop: insets.top + 4 }]}>
                <View style={styles.topBar}>
                    <Pressable onPress={() => router.back()} style={styles.topIconButton}>
                        <Ionicons name="arrow-back" size={22} color={BRAND_COLOR} />
                    </Pressable>
                    <Text style={styles.topBarTitle} numberOfLines={1}>Digital Epicurean</Text>
                    <Pressable onPress={handleShare} style={styles.topIconButton}>
                        <Ionicons name="share-social-outline" size={22} color={BRAND_COLOR} />
                    </Pressable>
                </View>

                <View style={styles.heroImageWrap}>
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} style={styles.heroImage} resizeMode="contain" />
                    ) : (
                        <View style={styles.heroFallback}>
                            <Ionicons name="nutrition-outline" size={74} color="#ffffff" />
                        </View>
                    )}
                </View>
            </View>

            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.mainCard}>
                    <Pressable style={styles.favoriteButton}>
                        <Ionicons name="heart" size={22} color={BRAND_COLOR} />
                    </Pressable>

                    <Text style={styles.brandText}>{brand.toUpperCase()}</Text>
                    <Text style={styles.titleText}>{title}</Text>

                    <View style={styles.scoresRow}>
                        <ScoreBadge titulo="NUTRI-SCORE" letra={scores.nutriLabel} colorFondo={scores.nutriColor} />
                        <ScoreBadge titulo="NOVA GROUP" letra={scores.novaLabel} colorFondo={scores.novaColor} />
                        <ScoreBadge titulo="ECO-SCORE" letra={scores.ecoLabel} colorFondo={scores.ecoColor} />
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.nutritionChipsRow}>
                        {nutritionChips.map((item) => (
                            <NutricionItem key={item.title} titulo={item.title} valor={item.value} />
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="restaurant-outline" size={18} color={BRAND_COLOR} />
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                    </View>
                    <Text style={styles.ingredientsText}>{ingredients}</Text>

                    <View style={styles.alertBox}>
                        <View style={styles.alertHeader}>
                            <Ionicons name="warning-outline" size={18} color={ALERT_TEXT} />
                            <Text style={styles.alertTitle}>ALLERGEN INFORMATION</Text>
                        </View>
                        <Text style={styles.alertText}>{allergenInfo}</Text>
                    </View>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitleLarge}>Nutritional Values (per 100g)</Text>
                    <View style={styles.tableWrap}>
                        {nutritionRows.map((row) => (
                            <DetailRow
                                key={row.label}
                                label={row.label}
                                value={row.value}
                                subtle={row.subtle}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: SCREEN_BG,
    },
    loadingScreen: {
        flex: 1,
        backgroundColor: SCREEN_BG,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    loadingText: {
        marginTop: 14,
        fontSize: 16,
        color: TEXT_MUTED,
    },
    errorTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#14161b",
        marginBottom: 8,
        textAlign: "center",
    },
    errorText: {
        fontSize: 15,
        color: TEXT_MUTED,
        textAlign: "center",
        marginBottom: 18,
    },
    retryButton: {
        backgroundColor: BRAND_COLOR,
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 14,
        marginBottom: 10,
    },
    retryButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
    secondaryButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    secondaryButtonText: {
        color: TEXT_MUTED,
        fontWeight: "700",
    },
    hero: {
        backgroundColor: HERO_COLOR,
        paddingHorizontal: 18,
        paddingBottom: 30,
    },
    topBar: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    topIconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    topBarTitle: {
        flex: 1,
        textAlign: "center",
        fontSize: 17,
        fontWeight: "800",
        color: BRAND_COLOR,
        marginHorizontal: 12,
    },
    heroImageWrap: {
        height: 340,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    heroImage: {
        width: "82%",
        height: "100%",
    },
    heroFallback: {
        width: 200,
        height: 280,
        borderRadius: 28,
        backgroundColor: "rgba(255,255,255,0.18)",
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContent: {
        paddingBottom: 40,
    },
    mainCard: {
        backgroundColor: SURFACE,
        marginTop: -38,
        marginHorizontal: 18,
        borderRadius: 34,
        paddingHorizontal: 24,
        paddingTop: 22,
        paddingBottom: 26,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 5,
    },
    favoriteButton: {
        position: "absolute",
        top: -32,
        right: 18,
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#fff3f2",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    brandText: {
        color: BRAND_COLOR,
        fontWeight: "700",
        fontSize: 12,
        letterSpacing: 1.2,
        marginBottom: 8,
    },
    titleText: {
        fontSize: 27,
        lineHeight: 31,
        fontWeight: "900",
        color: "#15181b",
        marginBottom: 24,
    },
    scoresRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 22,
    },
    nutritionChipsRow: {
        paddingRight: 8,
    },
    sectionCard: {
        backgroundColor: SURFACE,
        marginTop: 16,
        marginHorizontal: 18,
        borderRadius: 28,
        padding: 22,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 18,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: "#14161b",
    },
    sectionTitleLarge: {
        fontSize: 17,
        fontWeight: "800",
        color: "#14161b",
        marginBottom: 18,
    },
    ingredientsText: {
        fontSize: 15,
        lineHeight: 26,
        color: "#24262b",
    },
    alertBox: {
        marginTop: 20,
        borderRadius: 16,
        backgroundColor: ALERT_BG,
        padding: 16,
    },
    alertHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    alertTitle: {
        color: ALERT_TEXT,
        fontSize: 12,
        fontWeight: "800",
    },
    alertText: {
        color: ALERT_TEXT,
        fontSize: 15,
        lineHeight: 22,
    },
    tableWrap: {
        gap: 2,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    detailRowSubtle: {
        paddingLeft: 14,
    },
    detailLabel: {
        flex: 1,
        fontSize: 15,
        color: "#2a2d32",
    },
    detailLabelSubtle: {
        color: TEXT_MUTED,
        fontStyle: "italic",
    },
    detailValue: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111318",
        marginLeft: 12,
    },
});
