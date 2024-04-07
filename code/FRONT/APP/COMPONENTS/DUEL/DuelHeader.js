import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../SHARED/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export default function DuelHeader({ user }) {

    const focus = useIsFocused();
    const nav = useNavigation();

    const [progress, setProgress] = useState(0.0);
    const [perc, setPerc] = useState(0.5);
    const [indeterminate, setIndeterminate] = useState(true);

    useEffect(() => {
        setProgress(0.0);
        let interval;
        const timer = setTimeout(() => {
            setIndeterminate(false);
            interval = setInterval(() => {
                setProgress(progress => {
                    if (progress < perc) {
                        return parseFloat((progress + 0.01).toFixed(2));
                    }
                    else
                        return progress;
                });
            }, 10);
        }, 1000);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [focus, perc]);

    return (
        <View style={styles.container}>

            <View style={styles.xpContainer}>
                <View style={styles.lineContainer}>
                    <Text style={styles.whiteTitle}>{user?.username}</Text>
                </View>
                <View style={styles.lineContainer}>
                    <Text style={styles.whiteText}>Niveau</Text>
                    <Text style={styles.levelText}>{user?.level ? user.level : "12"}</Text>
                </View>
                <Progress.Circle
                    size={100}
                    progress={progress}
                    showsText={true}
                    textStyle={styles.progressText}
                    thickness={8}
                    color={Colors.white}
                    indeterminate={indeterminate}
                />
            </View>

            <View style={styles.separatorVertical} />

            <View style={styles.progressContainer}>
                <View style={styles.lineContainer}>
                    <Image
                        source={{ uri: user?.imageUrl }}
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.lineContainer}>
                    <Text style={styles.whiteText}>Score général</Text>
                </View>
                <View style={styles.lineContainer}>
                    <MaterialIcons name="grade" size={24} color={Colors.white} />
                    <Text style={styles.whiteText}>3,5/5</Text>
                </View>
                <View style={styles.separator} />
                <TouchableOpacity
                    onPress={() => nav.navigate('Profile', { user: user })}
                    style={styles.reviewAllBtn} >
                    <Text style={styles.reviewAllText}>Voir profil</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.darkGrey,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        margin: 8,
        flex: 1,
        gap: 30
    },
    xpContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
        gap: 10,
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
    cardsText: {
        fontSize: 12,
        fontFamily: 'poppins-italic',
        color: Colors.lightGray2,
    },
    reviewAllBtn: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    reviewAllText: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.darkGrey,
    },
    separator: {
        borderBottomColor: Colors.lightGray2,
        borderBottomWidth: 1,
    },
    separatorVertical: {
        borderRightColor: Colors.lightGray2,
        borderRightWidth: 1,
    },
    whiteTitle: {
        color: Colors.white,
        fontSize: 20,
        fontFamily: 'poppins-semibold'
    },

    whiteText: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: 'poppins'
    },
    levelText: {
        color: Colors.white,
        fontFamily: 'poppins',
        fontSize: 20,
        backgroundColor: Colors.primary,
        borderRadius: 99,
        width: 30,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: Colors.white,
        borderWidth: 2,

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },


})