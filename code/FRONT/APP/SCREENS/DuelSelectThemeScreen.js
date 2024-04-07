import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Colors from '../SHARED/Colors';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import ThemeToSelect from '../COMPONENTS/DUEL_SELECT_THEME/ThemeToSelect';

export default function DuelSelectThemeScreen() {

    const nav = useNavigation();
    const duelThemes = useRoute().params.duelThemes;
    const themes = useRoute().params.themes;
    const duel = useRoute().params.duel;

    const isAvailable = (theme) => {
        if (!duelThemes)
            return true;
        else
            return duelThemes.find(dt => dt.themeId == theme.id) ? false : true;
    }

    const getRandomAvailableTheme = () => {
        let availableThemes = themes.filter(t => isAvailable(t));
        return availableThemes[Math.floor(Math.random() * availableThemes.length)];
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ color: Colors.darkGrey, fontSize: 24, fontFamily: 'poppins-semibold' }}>Choix du thème</Text>

                <View style={styles.lineContainer}>
                    <ThemeToSelect
                        theme={null}
                        isAvailable={true}
                        onPress={() => nav.replace('DuelQuestions', { theme: getRandomAvailableTheme(), duel: duel, selector: true })}
                    />
                </View>
                {
                    themes && themes.map((theme, index) => {
                        if (index % 3 === 0) {
                            return (
                                <View style={styles.lineContainer} key={index}>
                                    <ThemeToSelect
                                        theme={theme}
                                        isAvailable={isAvailable(theme)}
                                        onPress={() => nav.replace('DuelQuestions', { theme: theme, duel: duel, selector: true })}
                                    />
                                    {
                                        themes[index + 1] &&
                                        <ThemeToSelect
                                            theme={themes[index + 1]}
                                            isAvailable={isAvailable(themes[index + 1])}
                                            onPress={() => nav.replace('DuelQuestions', { theme: themes[index + 1], duel: duel, selector: true })}
                                        />
                                    }
                                    {
                                        themes[index + 2] &&
                                        <ThemeToSelect
                                            theme={themes[index + 2]}
                                            isAvailable={isAvailable(themes[index + 2])}
                                            onPress={() => nav.replace('DuelQuestions', { theme: themes[index + 2], duel: duel, selector: true })}
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

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: ScreenHeight,
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
})