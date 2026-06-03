import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface BuscadorProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void; // En React Native se usa onChangeText para strings
}

export default function Buscador({ placeholder = "Buscar...", value, onChangeText }: BuscadorProps) {
    // Si el usuario escribió algo, el texto se vuelve blanco (más llamativo en fondos oscuros)
    // Si está vacío, usa el color que pediste.
    const colorTextoActivo = value.length > 0 ? '#C87C86' : '#64686f';
    const colorIcono = value.length > 0 ? '#C87C86' : '#64686f';

    return (
        <View style={styles.contenedor}>
            {/* Icono de búsqueda al inicio */}
            <Feather
                name="search"
                size={20}
                color={colorIcono}
                style={styles.icono}
            />

            {/* Campo de entrada de texto */}
            <TextInput
                style={[styles.input, { color: colorTextoActivo }]}
                placeholder={placeholder}
                placeholderTextColor="#64686f"
                value={value}
                onChangeText={onChangeText}
                autoCorrect={false}
                autoCapitalize="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F6F7', // Un fondo oscuro complementario para que resalten los textos
        borderRadius: 14,           // Bordes un poco redondeados
        paddingHorizontal: 16,      // Padding interno horizontal
        paddingVertical: 12,        // Padding interno vertical
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    icono: {
        marginRight: 10,            // Espacio entre el icono y el texto
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 0,         // Resetea paddings por defecto de Android
        fontWeight: '500',
    },
});