import { Ionicons } from "@expo/vector-icons";
import {
    BarcodeScanningResult,
    CameraView,
    useCameraPermissions,
} from "expo-camera";
import { useState } from "react";
import {
    ActivityIndicator,
    Linking,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

const PRIMARY = "#a6517d";

interface CamaraProps {
    visible: boolean;
    onClose: () => void;
    onScanned: (code: string) => void;
}

export default function Camara({ visible, onClose, onScanned }: CamaraProps) {
    const [scanState, setScanState] = useState<"idle" | "loading" | "found" | "not_found">("idle");
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [permission, requestPermission] = useCameraPermissions();

    const handleClose = () => {
        setScanState("idle");
        setScannedCode(null);
        onClose();
    };

    const handleRetry = () => {
        setScanState("idle");
        setScannedCode(null);
    };

    const handleRequestPermission = async () => {
        await requestPermission();
    };

    const handleBarcodeScan = async (result: BarcodeScanningResult) => {
        if (scanState !== "idle") return;
        setScanState("loading");
        setScannedCode(result.data);
        try {
            onScanned(result.data);
            setScanState("found");
        } catch {
            setScanState("not_found");
        }
    };

    if (!permission) {
        return (
            <Modal visible={visible} animationType="slide" transparent={false}>
                <View style={styles.centrado}>
                    <ActivityIndicator size="large" color={PRIMARY} />
                    <Text style={styles.permissionText}>Cargando permisos...</Text>
                </View>
            </Modal>
        );
    }

    if (!permission.granted && permission.canAskAgain) {
        return (
            <Modal visible={visible} animationType="slide" transparent={false}>
                <View style={styles.centrado}>
                    <Ionicons name="camera-outline" size={64} color="#d4d4d8" />
                    <Text style={styles.permissionText}>
                        Necesitamos permiso para usar la cámara.
                    </Text>
                    <Text style={styles.permissionSubtext}>
                        Tocá el botón para autorizar el escaneo.
                    </Text>
                    <Pressable style={styles.boton} onPress={handleRequestPermission}>
                        <Text style={styles.botonTexto}>Solicitar permiso</Text>
                    </Pressable>
                    <Pressable style={styles.botonSecundario} onPress={handleClose}>
                        <Text style={styles.botonSecundarioTexto}>Cancelar</Text>
                    </Pressable>
                </View>
            </Modal>
        );
    }

    if (!permission.granted) {
        return (
            <Modal visible={visible} animationType="slide" transparent={false}>
                <View style={styles.centrado}>
                    <Ionicons name="settings-outline" size={64} color="#d4d4d8" />
                    <Text style={styles.permissionText}>
                        El permiso de cámara fue denegado.
                    </Text>
                    <Text style={styles.permissionSubtext}>
                        Habilitalo desde Ajustes.
                    </Text>
                    <Pressable style={styles.boton} onPress={Linking.openSettings}>
                        <Text style={styles.botonTexto}>Ir a Ajustes</Text>
                    </Pressable>
                    <Pressable style={styles.botonSecundario} onPress={handleClose}>
                        <Text style={styles.botonSecundarioTexto}>Cancelar</Text>
                    </Pressable>
                </View>
            </Modal>
        );
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={handleClose}
            transparent={false}
        >
            <View style={styles.modalContainer}>
                {/* Header */}
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Escanear código de barras</Text>
                    <Pressable onPress={handleClose} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color="#191c1d" />
                    </Pressable>
                </View>

                {/* Cámara */}
                {scanState === "idle" && (
                    <View style={styles.cameraWrapper}>
                        <CameraView
                            style={styles.camera}
                            facing="back"
                            onBarcodeScanned={handleBarcodeScan}
                            barcodeScannerSettings={{
                                barcodeTypes: [
                                    "ean13",
                                    "ean8",
                                    "upc_a",
                                    "upc_e",
                                    "code128",
                                    "code39",
                                    "code93",
                                    "qr",
                                    "pdf417",
                                    "aztec",
                                    "datamatrix",
                                    "itf14",
                                    "codabar",
                                ],
                            }}
                        />
                        <View style={styles.scanOverlay}>
                            <View style={styles.scanFrame} />
                            <Text style={styles.scanHint}>
                                Acercá el código de barras al recuadro
                            </Text>
                        </View>
                    </View>
                )}

                {/* Buscando producto */}
                {scanState === "loading" && (
                    <View style={styles.resultArea}>
                        <ActivityIndicator size="large" color={PRIMARY} />
                        <Text style={styles.resultTitle}>Buscando producto…</Text>
                    </View>
                )}

                {/* Encontrado */}
                {scanState === "found" && (
                    <View style={styles.resultArea}>
                        <Ionicons name="checkmark-circle" size={64} color="#16a34a" />
                        <Text style={styles.resultTitle}>Producto encontrado</Text>
                        <Text style={styles.resultCode}>{scannedCode}</Text>
                        <Pressable style={styles.boton} onPress={handleRetry}>
                            <Text style={styles.botonTexto}>Volver a escanear</Text>
                        </Pressable>
                        <Pressable style={styles.botonSecundario} onPress={handleClose}>
                            <Text style={styles.botonSecundarioTexto}>Cerrar</Text>
                        </Pressable>
                    </View>
                )}

                {/* No encontrado */}
                {scanState === "not_found" && (
                    <View style={styles.resultArea}>
                        <Ionicons name="warning-outline" size={64} color="#ef4444" />
                        <Text style={[styles.resultTitle, { color: "#ef4444" }]}>
                            Producto no encontrado
                        </Text>
                        <Text style={styles.resultCode}>{scannedCode}</Text>
                        <Text style={styles.resultSubtitle}>
                            No está en la base de datos de OpenFoodFacts
                        </Text>
                        <Pressable style={styles.boton} onPress={handleRetry}>
                            <Text style={styles.botonTexto}>Volver a escanear</Text>
                        </Pressable>
                        <Pressable style={styles.botonSecundario} onPress={handleClose}>
                            <Text style={styles.botonSecundarioTexto}>Cerrar</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 16,
        backgroundColor: "#f8f9fa",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5ea",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#191c1d",
    },
    closeButton: {
        padding: 4,
    },
    centrado: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        paddingHorizontal: 40,
        gap: 16,
    },
    permissionText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#191c1d",
        textAlign: "center",
    },
    permissionSubtext: {
        fontSize: 14,
        color: "#71717a",
        textAlign: "center",
        marginBottom: 16,
    },
    cameraWrapper: {
        flex: 1,
        position: "relative",
    },
    camera: {
        flex: 1,
    },
    scanOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
    },
    scanFrame: {
        width: 240,
        height: 160,
        borderWidth: 3,
        borderColor: "#ffffff",
        borderRadius: 12,
    },
    scanHint: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "600",
        textShadowColor: "rgba(0,0,0,0.8)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    resultArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 16,
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#191c1d",
        textAlign: "center",
    },
    resultCode: {
        fontSize: 14,
        color: "#71717a",
        textAlign: "center",
        fontFamily: "monospace",
        marginVertical: 8,
    },
    resultSubtitle: {
        fontSize: 13,
        color: "#999999",
        textAlign: "center",
        marginBottom: 8,
    },
    boton: {
        marginTop: 8,
        backgroundColor: PRIMARY,
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    botonTexto: {
        color: "#ffffff",
        fontWeight: "700",
        fontSize: 15,
        textAlign: "center",
    },
    botonSecundario: {
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#e5e5ea",
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    botonSecundarioTexto: {
        color: "#71717a",
        fontWeight: "600",
        fontSize: 15,
        textAlign: "center",
    },
});
