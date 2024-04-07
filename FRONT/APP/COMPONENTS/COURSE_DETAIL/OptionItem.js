import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../SHARED/Colors';

export default function OptionItem({ icon, value }) {
    return (
        <View style={styles.option}>
            <Ionicons name={icon} size={18} color={Colors.white} />
            <Text style={styles.text}>{value}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    option: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        gap: 5
    },
    text: {
        fontSize: 14,
        fontFamily: 'poppins',
        color: Colors.white
    },
})