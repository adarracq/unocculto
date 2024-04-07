import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../SHARED/Colors'
import { AntDesign } from '@expo/vector-icons';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function DuelLine({ theme, questions }) {

    if (theme) {
        return (
            <View style={styles.container}>

                <Text style={styles.title}>{theme.title}</Text>
                <View style={styles.line}>
                    {
                        questions.questions.map((q, index) => {
                            switch (q.user1Answer) {
                                case true:
                                    return <AntDesign name="checkcircle" size={24} color={Colors.lightGreen} />
                                case false:
                                    return <AntDesign name="closecircle" size={24} color={Colors.lightRed} />
                                default:
                                    return <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                            }
                        })
                    }
                    <Image
                        source={{ uri: baseUrl + theme.logoUrl }}
                        style={{ width: 70, height: 70 }}
                    />
                    {
                        questions.questions.map((q, index) => {
                            switch (q.user2Answer) {
                                case true:
                                    return <AntDesign name="checkcircle" size={24} color={Colors.lightGreen} />
                                case false:
                                    return <AntDesign name="closecircle" size={24} color={Colors.lightRed} />
                                default:
                                    return <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                            }
                        })
                    }

                </View>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.line}>
                    <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                    <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                    <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                    <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                    <Image
                        source={{ uri: baseUrl + 'uploads/img/themes/random.png' }}
                        style={{ width: 70, height: 70 }}
                    />
                    <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                    <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                    <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                    <AntDesign name="questioncircle" size={24} color={Colors.lightBlue} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 10,
        elevation: 10,
        flex: 1,
        padding: 10,
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        position: 'absolute',
        top: 5,
        fontSize: 14,
        fontFamily: 'poppins',
        color: Colors.white,
    },
})