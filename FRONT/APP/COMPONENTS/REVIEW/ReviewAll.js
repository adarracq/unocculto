import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../SHARED/Colors'
import { Image } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function ReviewAll({ userCards }) {

    const nav = useNavigation();

    const [cards, setCards] = useState([]);
    const [cardsToReview, setCardsToReview] = useState([]);
    const [newCards, setNewCards] = useState([]);
    const [cardsToReviewToday, setCardsToReviewToday] = useState([]);
    const [isReviewable, setIsReviewable] = useState(false);
    const [progress, setProgress] = useState(0.0);
    const [perc, setPerc] = useState(0.0);
    const focus = useIsFocused();

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


    useEffect(() => {
        let _cards = userCards;

        setCards(_cards);

        let today = new Date();
        let _cardsToReview = _cards.filter(card => card.nextReview != null && Date.parse(card.nextReview) <= today);

        setCardsToReview(_cardsToReview);

        let _newCards = _cards.filter(card => card.nextReview == null);
        setNewCards(_newCards);

        // concat new cards and cards to review
        let _cardsToReviewToday = _cards.filter(card => card.nextReview == null || Date.parse(card.nextReview) <= today);
        setCardsToReviewToday(_cardsToReviewToday);


        if (_cardsToReview.length > 0 || _newCards.length > 0)
            setIsReviewable(true);
        else
            setIsReviewable(false);

        let _perc = (_cards.length - _cardsToReview.length - _newCards.length) / _cards.length;
        setPerc(_perc);

    }, [userCards, focus]);

    return (
        <View style={styles.container}>
            <Progress.Circle
                size={150}
                progress={progress}
                showsText={true}
                textStyle={styles.progressText}
                thickness={8}
                color={Colors.white}
                indeterminate={indeterminate}
            />
            <View style={styles.separatorVertical} />

            <View style={styles.progressContainer}>
                <View style={styles.progressLineContainer}>
                    <MaterialCommunityIcons name="cards" size={18} color={Colors.lightBlue} />
                    <Text style={styles.cardsText}>{cards.length == 1 ? 'Une carte' : cards.length + " cartes"}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.progressLineContainer}>
                    <FontAwesome6 name="fire" size={18} color={Colors.lightRed} />
                    <Text style={styles.cards2Text}>{cardsToReview.length + " à réviser"}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.progressLineContainer}>
                    <FontAwesome6 name="circle-exclamation" size={18} color={Colors.lightGreen} />
                    <Text style={styles.cards3Text}>{newCards.length < 2 ? newCards.length + ' nouvelle' : newCards.length + " nouvelles"}</Text>
                </View>
                <TouchableOpacity style={styles.reviewAllBtn} onPress={() => nav.navigate('ReviewCard', { theme: null, cards: cardsToReviewToday })}>
                    <Text style={styles.reviewAllText}>Tout réviser</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


    return isReviewable ? (
        <TouchableOpacity style={styles.container} onPress={() => nav.navigate('ReviewCard', { theme: null, cards: cards })}>
            <Image source={{ uri: baseUrl + 'uploads/img/themes/book.png' }} style={styles.logo} />
            <Text style={styles.title}>{'Toutes les cartes'}</Text>
            <Text style={styles.progressText}>{newCards.length == 0 ? "Aucune nouvelle carte" : newCards.length == 1 ? "Une nouvelle carte" : newCards.length + " nouvelles cartes"}</Text>
            <Text style={styles.progressText}>{cardsToReview.length == 0 ? "Aucune carte à réviser" : cardsToReview.length == 1 ? "Une carte à réviser" : cardsToReview.length + " cartes à réviser"}</Text>
        </TouchableOpacity>

    ) : (
        <View style={styles.containerDisabled}>
            <Image source={{ uri: baseUrl + 'uploads/img/themes/book.png' }} style={styles.logo} />
            <Text style={styles.titleDisabled}>{'Toutes les cartes'}</Text>
            <AntDesign name="checkcircle" size={24} color={Colors.green} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.darkGrey,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        margin: 8,
        flex: 1,
        gap: 30
    },
    separatorVertical: {
        borderRightColor: Colors.lightGray2,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        height: '100%'
    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        gap: 10,
    },
    progressLineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 5,
    },
    cardsText: {
        fontSize: 12,
        fontFamily: 'poppins-italic',
        color: Colors.lightBlue,
    },
    cards2Text: {
        fontSize: 12,
        fontFamily: 'poppins-italic',
        color: Colors.lightRed,
    },
    cards3Text: {
        fontSize: 12,
        fontFamily: 'poppins-italic',
        color: Colors.lightGreen,
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
    }
})