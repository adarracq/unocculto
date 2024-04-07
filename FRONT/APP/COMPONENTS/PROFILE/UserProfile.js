import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../SHARED/Colors'
import { Image } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

export default function UserProfile({ user }) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Utilisateur</Text>

            <View style={styles.separator} />

            <View style={styles.lineContainer}>
                <Text style={styles.username}>{user?.username}</Text>
                <TouchableOpacity>
                    <EvilIcons name="pencil" size={24} color={Colors.lightBlue} />
                </TouchableOpacity>

            </View>

            <View style={styles.separator} />

            <View style={styles.lineContainer}>
                <Image
                    source={{ uri: user?.imageUrl }}
                    style={styles.avatar}
                />
                <TouchableOpacity>
                    <EvilIcons name="pencil" size={24} color={Colors.lightBlue} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.darkGrey,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        margin: 8,
        flex: 1,
        gap: 20
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        gap: 5,
        flex: 1,
    },
    separator: {
        borderBottomColor: Colors.lightGray2,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
        textAlign: 'center',
    },
    username: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
        textAlignVertical: 'center',
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },

    changeBtn: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    changeText: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.darkGrey,
    },
})