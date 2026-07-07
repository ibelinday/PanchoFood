import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type IndicadorCargaProps = {
    color?: string;
    width?: number;
    height?: number;
}

export default function IndicadorCarga({ color = '#a6517d', width = 40, height = 40 }: IndicadorCargaProps) {
    return (
        <View style={[styles.container, { width, height }]}>
            <ActivityIndicator size="large" color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});