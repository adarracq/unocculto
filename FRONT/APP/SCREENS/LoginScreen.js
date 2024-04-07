import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import colors from '../SHARED/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../HOOKS/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);


    return (
        <View style={styles.page}>
            <Image
                style={styles.image}
                source={require('../ASSETS/img/login_img.jpg')}
            />
            <View style={styles.container}>
                <Text
                    style={styles.welcomeText}>
                    Bienvenue sur Unocculto
                </Text>
                <TouchableOpacity style={styles.button}
                    onPress={onPress}>

                    <FontAwesome5 name="google" size={24} color="white" />
                    <Text style={{ color: colors.white, marginLeft: 10 }}>Sign In with google</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
    image: {
        width: '100%',
        objectFit: 'cover',
        height: 300
    },
    container: {
        backgroundColor: '#fff',
        marginTop: -50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 30,
    },
    welcomeText: {
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'poppins-semibold',
        marginTop: 50,
        height: 200
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        margin: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 50

    }
})