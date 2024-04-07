import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../SHARED/Colors'
import { Image } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function ReviewTheme({ theme, userCards }) {

    const nav = useNavigation();

    const [cards, setCards] = useState([]);
    const [cardsToReview, setCardsToReview] = useState([]);
    const [newCards, setNewCards] = useState([]);
    const [isReviewable, setIsReviewable] = useState(false);

    useEffect(() => {
        let _cards = [];
        if (theme)
            _cards = userCards.filter(card => card.themeId === theme.id);
        else
            _cards = userCards;


        setCards(_cards);


        let today = new Date();
        let _cardsToReview = _cards.filter(card => card.nextReview != null && Date.parse(card.nextReview) <= today);

        setCardsToReview(_cardsToReview);

        let _newCards = _cards.filter(card => card.nextReview == null);
        setNewCards(_newCards);

        if (_cardsToReview.length > 0 || _newCards.length > 0)
            setIsReviewable(true);
        else
            setIsReviewable(false);

    }, [userCards]);


    return isReviewable ? (
        <TouchableOpacity style={styles.container} onPress={() => nav.navigate('ReviewCard', { theme: theme, cards: cards })}>
            <Image source={{ uri: baseUrl + theme?.logoUrl }} style={styles.logo} />
            <Text style={styles.title}>{theme?.title}</Text>
            <View style={styles.separator} />
            <View style={styles.progressContainer}>
                <MaterialCommunityIcons name="cards" size={18} color={Colors.lightBlue} />
                <Text style={styles.progressText}>{cards.length == 1 ? '1 carte' : cards.length + " cartes"}</Text>
            </View>

            {
                cardsToReview.length > 0 &&
                <View style={styles.progressContainer}>
                    <FontAwesome6 name="fire" size={18} color={Colors.lightRed} />
                    <Text style={styles.progress2Text}>{cardsToReview.length == 1 ? '1 à réviser' : cardsToReview.length + " à réviser"}</Text>
                </View>
            }
            {
                newCards.length > 0 &&
                <View style={styles.progressContainer}>
                    <FontAwesome6 name="circle-exclamation" size={18} color={Colors.lightGreen} />
                    <Text style={styles.progress3Text}>{newCards.length == 1 ? '1 nouvelle' : newCards.length + " nouvelles"}</Text>
                </View>

            }
        </TouchableOpacity>

    ) : (
        <View style={styles.containerDisabled}>
            <Image source={{ uri: baseUrl + theme?.logoUrl }} style={styles.logo} />
            <Text style={styles.titleDisabled}>{theme.title}</Text>
            <View style={styles.progressContainer}>
                <MaterialCommunityIcons name="cards" size={18} color={Colors.lightGray2} />
                <Text style={styles.progress2Text}>{cards.length < 2 ? cards.length + ' carte' : cards.length + " cartes"}</Text>
            </View>
            <AntDesign name="checkcircle" size={24} color={Colors.green} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.darkGrey,
        padding: 15,
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
        padding: 15,
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
    title: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
    },
    titleDisabled: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        color: Colors.gray,
    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 5,
    },
    progressText: {
        fontSize: 12,
        fontFamily: 'poppins-italic',
        color: Colors.lightBlue,
    },
    progress2Text: {
        fontSize: 12,
        fontFamily: 'poppins-italic',
        color: Colors.lightRed,
    },
    progress3Text: {
        fontSize: 12,
        fontFamily: 'poppins-italic',
        color: Colors.lightGreen,
    },
    separator: {
        borderBottomColor: Colors.lightGray2,
        borderBottomWidth: 1,
        width: '100%',
    },
})