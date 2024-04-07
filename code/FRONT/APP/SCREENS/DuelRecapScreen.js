import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { AuthContext } from '../CONTEXTS/AuthContext';
import Colors from '../SHARED/Colors';
import DuelLine from '../COMPONENTS/DUEL_RECAP/DuelLine';
import { QuestionContext } from '../CONTEXTS/QuestionContext';
import { ThemeContext } from '../CONTEXTS/ThemeContext';

export default function DuelRecapScreen() {

    const nav = useNavigation();
    const duel = useRoute().params.duel;
    const [userData, setUserData] = useContext(AuthContext);
    const [scoreUser1, setScoreUser1] = useState(0);
    const [scoreUser2, setScoreUser2] = useState(0);
    const [themes, setThemes] = useContext(ThemeContext);
    const [duelThemes, setDuelThemes] = useState([]);
    const focus = useIsFocused();


    const calculateScore = () => {
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
        setScoreUser1(scoreUser1);
        setScoreUser2(scoreUser2);
    }

    const getTheme = (id) => {
        return themes.find(t => t.id === id);
    }


    const getUserToPlay = () => { // true if user to play, false if opponent to play
        // if last question not answered by a user -> return this user
        if (duel.results && duel.results[duel.results?.length - 1]?.questions[0]?.user1Answer == null)
            return duel.username1 == userData.username;
        else if (duel.results && duel.results[duel.results?.length - 1]?.questions[0]?.user2Answer == null)
            return duel.username2 == userData.username;
        // else if last question answered by both users -> return the other user theme.selector
        else
            if (!duel.results)
                return true
            else if (duel.results[duel.results?.length - 1]?.selector == duel.username1)
                return duel.username2 == userData.username;
            else
                return duel.username1 == userData.username;
    }

    const play = () => {
        // if last question not answered by a user -> user answer this question
        if (duel.results && duel.results[duel.results?.length - 1]?.questions[0]?.user1Answer == null) {
            let lastTheme = getTheme(duel.results[duel.results?.length - 1].themeId);
            nav.navigate('DuelQuestions', { theme: lastTheme, duel: duel, selector: false })
        }
        // else if last question answered by both users -> user select a theme
        else
            nav.navigate('SelectTheme', { duel: duel, duelThemes: duelThemes, themes: themes })
    }


    useEffect(() => {
        calculateScore();
    }, [duel, focus]);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Résultat</Text>
                <View style={styles.line}>
                    <Text style={styles.username}>{duel.username1 ? duel.username1 : 'Player256'}</Text>
                    <Text style={styles.score}>{scoreUser1 + ' - ' + scoreUser2}</Text>
                    <Text style={styles.username}>{duel.username2 ? duel.username2 : 'Player256'}</Text>
                </View>
            </View>
            <View style={styles.duels}>
                {
                    duel?.results?.map((questions, index) => {
                        return (
                            <DuelLine
                                key={index}
                                questions={questions}
                                theme={getTheme(questions.themeId)}
                            />
                        )
                    })
                }
                {
                    duel.results ?
                        Array.from({ length: 4 - duel.results?.length }, (_, i) => i).map((index) => {
                            return (
                                <DuelLine
                                    key={index}
                                />
                            )
                        })
                        :
                        Array.from({ length: 4 }, (_, i) => i).map((index) => {
                            return (
                                <DuelLine
                                    key={index + 4}
                                />
                            )
                        })
                }
            </View>
            {
                getUserToPlay() ?
                    <TouchableOpacity
                        style={styles.toPlayContainer}
                        onPress={play}
                    >
                        <Text style={styles.toPlayText}>A toi de jouer !</Text>
                    </TouchableOpacity>
                    :
                    <View style={styles.toPlayContainer}>
                        <Text style={styles.toPlayText}>A ton adversaire de jouer !</Text>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: Colors.lightGray,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.darkGrey,
        borderRadius: 10,
        elevation: 10,
        margin: 8,
        gap: 30
    },
    duels: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 8,
        flex: 1,
        gap: 10,
    },
    line: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontFamily: 'poppins',
        color: Colors.lightBlue,
    },
    username: {
        fontSize: 16,
        fontFamily: 'poppins-italic',
        flex: 1,
        textAlign: 'center',
        color: Colors.white,
    },
    score: {
        fontSize: 20,
        fontFamily: 'poppins-bold',
        textAlign: 'center',
        color: Colors.white,
    },
    toPlayContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlue,
        padding: 15,
        borderRadius: 10,
        elevation: 10,
        margin: 8,
    },
    toPlayText: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.blue,
    }

})