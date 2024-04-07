import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ReviewTheme from '../COMPONENTS/REVIEW/ReviewTheme';
import { UserCardContext } from '../CONTEXTS/UserCardContext';
import { ThemeContext } from '../CONTEXTS/ThemeContext';
import Colors from '../SHARED/Colors';
import { userCardService } from '../SERVICES/userCard.service';
import { AuthContext } from '../CONTEXTS/AuthContext';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import ReviewAll from '../COMPONENTS/REVIEW/ReviewAll';

export default function ReviewScreen() {

    const [themes, setThemes] = useContext(ThemeContext);
    const [userCards, setUserCards] = useContext(UserCardContext);
    const [userData, setUserData] = useContext(AuthContext);
    const focus = useIsFocused();


    useEffect(() => {
        if (focus == true && userData) {
            userCardService.getByUserEmail(userData.email).then(resp => { setUserCards(resp); })
        }
    }, [focus]);

    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.lineContainer}>
                    <ReviewAll
                        userCards={userCards}
                    />
                </View>
                {
                    themes && themes.map((theme, index) => {
                        if (index % 2 === 0) {
                            return (
                                <View style={styles.lineContainer} key={index}>
                                    <ReviewTheme
                                        theme={theme}
                                        userCards={userCards}
                                    />
                                    {
                                        themes[index + 1] &&
                                        <ReviewTheme
                                            theme={themes[index + 1]}
                                            userCards={userCards}
                                        />
                                    }
                                </View>
                            )
                        }
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: Colors.white,
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})