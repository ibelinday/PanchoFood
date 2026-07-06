import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';

interface ProductoProps {
    id: string;
    nombre: string;
    marca: string;
    image_url?: string;
}

export default function Producto({ id, nombre, marca, image_url }: ProductoProps) {
    // Si el nombre viene vacío por un error de la API, le ponemos un texto por defecto
    const titulo = nombre || "Producto sin nombre";
    const codigo = marca || "Sin ID";
    const [loadError, setLoadError] = React.useState(false);
    const hasImage = !loadError && image_url && image_url.trim().length > 0;

    return (
        <Link href={`/productos/${id}`} asChild>
            <Pressable>
                <View style={styles.tarjeta}>

                    {/* Izquierda: El cuadrado gris para la foto */}
                    <View style={styles.cajaFoto}>
                        {hasImage ? (
                            <Image
                                source={{ uri: image_url }}
                                style={styles.imagen}
                                onError={() => setLoadError(true)}
                                onLoad={() => setLoadError(false)}
                            />
                        ) : (
                            <Text style={{ color: '#C0C0C4', fontSize: 24 }}>🍴</Text>
                        )}
                    </View>

                    {/* Centro: Textos y Etiquetas */}
                    <View style={styles.bloqueTextos}>
                        <Text style={styles.textoTitulo} numberOfLines={2}>{titulo}</Text>
                        <Text style={styles.textoMarca} numberOfLines={1}>{codigo}</Text>

                        {/* 🌟 Etiqueta Real en vez de la falsa */}
                        <View style={styles.filaBadges}>
                            <View style={[styles.badge, { backgroundColor: "#E6A100" }]}>
                                <Text style={styles.textoBadge}>Alimento</Text>
                            </View>
                        </View>
                    </View>

                    {/* Derecha: Flecha */}
                    <View style={styles.cajaFlecha}>
                        <Text style={{ color: '#CCCCCC', fontSize: 18 }}>➔</Text>
                    </View>

                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    tarjeta: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        padding: 14,
        marginHorizontal: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#F0F0F2',
    },
    cajaFoto: {
        width: 76,
        height: 76,
        backgroundColor: '#F2F2F4',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imagen: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bloqueTextos: {
        flex: 1,
        paddingHorizontal: 14,
    },
    textoTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 2,
    },
    textoMarca: {
        fontSize: 11,
        fontWeight: '600',
        color: '#64686f',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    // 🌟 Estilos nuevos para la etiqueta
    filaBadges: {
        flexDirection: "row",
    },
    badge: {
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 4,
    },
    textoBadge: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "bold",
    },
    cajaFlecha: {
        width: 20,
        alignItems: 'center',
    },
});