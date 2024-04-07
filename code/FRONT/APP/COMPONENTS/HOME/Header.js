import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../SHARED/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../CONTEXTS/AuthContext';

export default function Header({ search, setSearch }) {
    const [userData, setUserData] = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.row}>
                    <Image
                        source={{ uri: userData?.imageUrl }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.whiteText}>Bienvenue,</Text>
                        <Text style={styles.whiteTitle}>{userData?.firstname}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Ionicons name="bulb" size={24} color={Colors.yellow} />
                    <Text style={styles.whiteTitle}>{userData?.coins}</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome name="heart" size={24} color={Colors.red} />
                    <Text style={styles.whiteTitle}>{userData?.lives}</Text>
                </View>
            </View>
            <View style={styles.searchArea}>
                <TextInput
                    style={styles.searchText}
                    placeholder='Rechercher...'
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
                <Ionicons name="search-circle" size={45} color={Colors.primary} />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingTop: 50,
        padding: 20,
    },
    headerContainer: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    whiteTitle: {
        color: Colors.white,
        fontSize: 20,
        fontFamily: 'poppins-semibold'
    },
    whiteText: {
        color: Colors.white,
        fontFamily: 'poppins'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    searchArea: {
        backgroundColor: Colors.white,
        paddingLeft: 20,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30
    },
    searchText: {
        fontFamily: 'poppins',
        width: '80%',
    }

})