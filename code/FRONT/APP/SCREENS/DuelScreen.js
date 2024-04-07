import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import DuelHeader from '../COMPONENTS/DUEL/DuelHeader'
import { AuthContext } from '../CONTEXTS/AuthContext';
import Colors from '../SHARED/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { duelService } from '../SERVICES/duel.service';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function DuelScreen() {
    const focus = useIsFocused();

    const [userData, setUserData] = useContext(AuthContext);
    const [duels, setDuels] = useState([]);
    const nav = useNavigation();

    const joinRandomGame = () => {
        duelService.join(userData.username).then(duel => {
            if (duel) {
                nav.navigate('DuelRecap', { duel: duel });
            }
        })
    }

    const getOpponentName = (duel) => {
        if (duel.username1 == userData.username)
            if (duel.username2)
                return duel.username2;
            else
                return "Aléatoire";
        else
            return duel.username1;
    }

    const calculateScore = (duel) => {
        let scoreUser1 = 0;
        let scoreUser2 = 0;
        duel.results?.forEach(r => {
            r.questions.forEach(q => {
                if (q.user1Answer)
                    scoreUser1++;
                if (q.user2Answer)
                    scoreUser2++;
            });
        });
        return { scoreUser1, scoreUser2 };
    }

    useEffect(() => {
        duelService.getByUsername(userData.username)
            .then(data => {
                setDuels(data);
            })
    }, [focus, userData.username]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <DuelHeader
                    user={userData}
                />
                <View style={styles.newGameContainer} >
                    <Text style={styles.title}>Nouvelle Partie</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={joinRandomGame}
                            style={styles.randomBtnContainer}>
                            <Ionicons name="dice" size={24} color={Colors.blue} />
                            <Text style={styles.randomText}>Aléatoire</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.friendBtnContainer}>
                            <FontAwesome5 name="user-friends" size={24} color={Colors.red} />
                            <Text style={styles.friendText}>Un ami</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    duels.some(d => d.status == 1 || d.status == 0) &&
                    <View style={styles.newGameContainer} >
                        <Text style={styles.title}>Parties en cours</Text>
                        {
                            duels.map((d, i) => {
                                if (d.status == 1 || d.status == 0) {
                                    return (
                                        <TouchableOpacity key={i} style={styles.inProgressContainer} onPress={() => nav.navigate('DuelRecap', { duel: d })}>
                                            <Text style={styles.username1}>{d.username1 ? d.username1 : 'Aléatoire'}</Text>
                                            <Text style={styles.scoreContainer}>
                                                {calculateScore(d).scoreUser1 + '-' + calculateScore(d).scoreUser2}
                                            </Text>
                                            <Text style={styles.username2}>{d.username2 ? d.username2 : 'Aléatoire'}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                }
                {
                    duels.some(d => d.status == 2 || d.status == 3 || d.status == 4) &&
                    <View style={styles.newGameContainer} >
                        <Text style={styles.title}>Parties terminées</Text>
                        {
                            duels.map((d, i) => {
                                if (d.status == 2 || d.status == 3 || d.status == 4) {
                                    return (
                                        <TouchableOpacity key={i} style={styles.inProgressContainer} onPress={() => nav.navigate('DuelRecap', { duel: d })}>
                                            <Text style={styles.username1}>{d.username1 ? d.username1 : 'Aléatoire'}</Text>
                                            <Text style={styles.scoreContainer}>
                                                {calculateScore(d).scoreUser1 + '-' + calculateScore(d).scoreUser2}
                                            </Text>
                                            <Text style={styles.username2}>{d.username2 ? d.username2 : 'Aléatoire'}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                }

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: Colors.lightGray,
    },
    newGameContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        backgroundColor: Colors.darkGrey,
        borderRadius: 10,
        elevation: 10,
        margin: 8,
        flex: 1,
        gap: 30
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'poppins-bold',
        color: Colors.white,
    },
    randomBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlue,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        flex: 1,
        gap: 5
    },
    randomText: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.blue,
    },
    friendBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.lightRed,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        flex: 1,
        gap: 5
    },
    friendText: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.red,
    },
    inProgressContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        padding: 5,
        borderRadius: 10,
        elevation: 10,
        flex: 1,
        gap: 5
    },
    scoreContainer: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        textAlignVertical: 'center',
        color: Colors.white,
        borderRadius: 10,
        padding: 5,
        backgroundColor: Colors.darkGrey,
    },
    username1: {
        fontSize: 16,
        fontFamily: 'poppins-light',
        color: Colors.blue,
        textAlign: 'right',
        flex: 1,
    },
    username2: {
        fontSize: 16,
        fontFamily: 'poppins-light',
        color: Colors.blue,
        textAlign: 'left',
        flex: 1,
    }

})