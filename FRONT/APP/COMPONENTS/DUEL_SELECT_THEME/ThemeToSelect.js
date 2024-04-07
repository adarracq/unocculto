import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../SHARED/Colors'
import { Image } from 'react-native-elements';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function ThemeToSelect({ theme, isAvailable, onPress }) {

    return theme ? (
        <TouchableOpacity style={isAvailable ? styles.container : styles.containerDisabled} onPress={onPress}>
            <Image source={{ uri: baseUrl + theme?.logoUrl }} style={styles.logo} />
            <Text style={isAvailable ? styles.title : styles.titleDisabled}>{theme.title}</Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.titleRandom}>Aléatoire</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.darkGrey,
        padding: 10,
        borderRadius: 10,
        elevation: 10,
        margin: 8,
        flex: 1,
        gap: 5
    },
    containerDisabled: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        opacity: 0.5,
        padding: 10,
        borderRadius: 10,
        elevation: 1,
        margin: 8,
        flex: 1,
        gap: 5
    },
    logo: {
        width: 50,
        height: 50,
    },
    titleRandom: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
    },
    title: {
        fontSize: 14,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
    },
    titleDisabled: {
        fontSize: 14,
        fontFamily: 'poppins-semibold',
        color: Colors.gray,
    },
})