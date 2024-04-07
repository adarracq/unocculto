import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../SHARED/Colors'

export default function ProgressBar({ currentIndex, nbBar }) {

    return (
        <View style={styles.container}>
            <View onPress style={styles.bar} />
            {
                Array.from({ length: nbBar - 1 }, (v, k) => {
                    return <View key={k} style={k < currentIndex ? styles.bar : styles.barGray} />
                })
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bar: {
        height: 7,
        width: 30,
        border: 1,
        backgroundColor: Colors.primary,
        borderRadius: 5,
        margin: 5,
        flex: 1
    },
    barGray: {
        height: 7,
        width: 30,
        border: 1,
        backgroundColor: Colors.gray,
        borderRadius: 5,
        margin: 5,
        flex: 1
    }
})