import { View, Text, StyleSheet, Image, Alert, Dimensions, Pressable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { QuestionContext } from '../CONTEXTS/QuestionContext';
import Colors from '../SHARED/Colors';
import { userCardService } from '../SERVICES/userCard.service';
import { TinderCard } from 'rn-tinder-card';
import { ChapterContext } from '../CONTEXTS/ChapterContext';
import FlipCard from 'react-native-flip-card'

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function ReviewCardScreen() {

    const tinderCardsRef = useRef([]);
    const theme = useRoute().params.theme;
    const cards = useRoute().params.cards;
    const [questions, setQuestions] = useContext(QuestionContext);
    const [chapters, setChapters] = useContext(ChapterContext);
    const [cardsToReview, setCardsToReview] = useState([]);
    //const [isQuiz, setIsQuiz] = useState(false);
    const [isQuestion, setIsQuestion] = useState(true);
    const [nbNewCard, setNbNewCard] = useState(0);
    const [nbToReview, setNbToReview] = useState(0);

    useEffect(() => {
        let _cardsToReview = cards;
        // add question and andswer to each card
        _cardsToReview.forEach(card => {
            let question = questions.find(q => q.id === card.questionId);
            let chapter = chapters.find(c => c.id === question.chapterId);
            card.question = question.question;
            card.answer = question.answer;
            card.wrongAnswer1 = question.wrongAnswer1;
            card.wrongAnswer2 = question.wrongAnswer2;
            card.wrongAnswer3 = question.wrongAnswer3;
            question.imageUrl ? card.url = baseUrl + question.imageUrl : card.url = baseUrl + chapter?.imageUrl;
        });

        // add the opposite question
        /*let oppositeCards = _cardsToReview.map(card => {
            let oppositeCard = { ...card };
            oppositeCard.question = card.answer;
            oppositeCard.answer = card.question;
            return oppositeCard;
        });

        _cardsToReview = _cardsToReview.concat(oppositeCards);*/

        // mix the cards
        for (let i = _cardsToReview.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = _cardsToReview[i];
            _cardsToReview[i] = _cardsToReview[j];
            _cardsToReview[j] = temp;
        }

        setCardsToReview(_cardsToReview);

        let _nbNewCard = _cardsToReview.filter(card => card.nextReview == null).length;
        setNbNewCard(_nbNewCard);

        let _nbToReview = _cardsToReview.filter(card => card.nextReview != null).length;
        setNbToReview(_nbToReview);

    }, [cards]);

    const onSwipedRight = (card) => {
        setIsQuestion(true);
        saveCard(card, false);
    }

    const onSwipedLeft = (card) => {
        setIsQuestion(true);
        nextCard(card);
    }

    const onSwipedTop = (card) => {
        setIsQuestion(true);
        saveCard(card, true);
    }

    const saveCard = (card, easy) => {
        userCardService.addLevel(card).then(() => {
            // add second levels if easy
            if (easy)
                userCardService.addLevel(card);
        });
        // remove the card from the array
        setCardsToReview(prev => prev.filter(c => c !== card));
    }

    const nextCard = (card) => {
        // restart the card
        userCardService.restart(card);
        // add the card to the start of the array
        setCardsToReview(prev => prev.filter(c => c !== card));
        setCardsToReview(prev => [card, ...prev]);
        setIsQuestion(true);
    }

    /*const quizSucceed = (card) => {
        saveCard(card);
        setIsQuiz(false);
    }

    const quizFailed = (card) => {
        nextCard(card);
        setIsQuiz(false);
    }*/

    const getNbDaysBeforeNextReview = (level) => {
        switch (level) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 3;
            case 3:
                return 7;
            case 4:
                return 15;
            case 5:
                return 30;
            case 6:
                return 60;
            case 7:
                return 120;
            case 8:
                return 360;
            default:
                return 0;
        }
    }


    const OverlayRight = () => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: Colors.green,
                    },
                ]}
            >
                <Text style={styles.overlayLabelText}>Je sais !</Text>
            </View>
        );
    };
    const OverlayLeft = () => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: Colors.red,
                    },
                ]}
            >
                <Text style={styles.overlayLabelText}>Je ne sais pas</Text>
            </View>
        );
    };
    const OverlayTop = () => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: Colors.lightBlue,
                    },
                ]}
            >
                <Text style={styles.overlayLabelText}>Facile</Text>
            </View>
        );
    };


    return cardsToReview.length > 0 ? (
        <View style={styles.wrapper}>
            {cardsToReview.map((card, index) => {
                return (
                    <View
                        style={styles.cardContainer}
                        pointerEvents="box-none"
                        key={index}
                    >
                        <FlipCard
                            friction={20}
                            perspective={800}
                            flipHorizontal={true}
                            flipVertical={false}
                            onFlipStart={(isFlipEnd) => { setIsQuestion(!isFlipEnd) }}
                        >
                            <View style={styles.answerContainer}>
                                <Image source={{ uri: card.url }} style={styles.image} />
                                <Text style={styles.question}>{card.question}</Text>
                                <Text style={styles.question}>?</Text>
                                <View style={styles.nextBtn}>
                                    <Text style={styles.btnText}>Voir la réponse</Text>
                                </View>
                            </View>

                            < TinderCard
                                ref={(el) => (tinderCardsRef.current[index] = el)}
                                cardWidth={Dimensions.get('window').width - 16}
                                cardHeight={Dimensions.get('window').height - 80}
                                OverlayLabelRight={OverlayRight}
                                OverlayLabelLeft={OverlayLeft}
                                OverlayLabelTop={OverlayTop}
                                cardStyle={styles.card}
                                onSwipedRight={() => onSwipedRight(card)}
                                onSwipedTop={() => onSwipedTop(card)}
                                onSwipedLeft={() => onSwipedLeft(card)}
                                disableBottomSwipe={true}
                            >
                                <Image source={{ uri: card.url }} style={styles.image} />

                                <Text style={styles.question}>{card.question}</Text>
                                <Text style={styles.answer}>{card.answer}</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.againBtn}
                                        onPress={() => {
                                            tinderCardsRef.current?.[index]?.swipeLeft();
                                        }}
                                    >
                                        <Text style={styles.againText}>Encore</Text>
                                        <Text style={styles.againTimeText}>{'< 10min'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.easyBtn}
                                        onPress={() => {
                                            tinderCardsRef.current?.[index]?.swipeTop();
                                        }}
                                    >
                                        <Text style={styles.easyText}>Facile</Text>
                                        <Text style={styles.easyTimeText}>{getNbDaysBeforeNextReview(card.level + 1) + 'j'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.correctBtn}
                                        onPress={() => {
                                            tinderCardsRef.current?.[index]?.swipeRight();
                                        }}
                                    >
                                        <Text style={styles.correctText}>Correct</Text>
                                        <Text style={styles.correctTimeText}>{getNbDaysBeforeNextReview(card.level) + 'j'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </TinderCard>
                        </FlipCard>

                    </View>
                );
            })}
        </View >
    )
        :
        (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontFamily: 'poppins-semibold' }}>Aucune carte à réviser</Text>
            </View>
        )

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.lightGray
    },
    answerContainer: {
        width: Dimensions.get('window').width - 16,
        height: Dimensions.get('window').height - 80,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    cardContainer: {
        ...StyleSheet.absoluteFillObject,
        marginTop: 50,
        alignItems: 'center',
    },
    card: {
        borderRadius: 10,
        backgroundColor: Colors.primary,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    image: {
        width: '100%',
        height: 300,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    question: {
        fontSize: 24,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    answer: {
        fontSize: 19,
        fontFamily: 'poppins-italic',
        color: Colors.white,
        textAlign: 'center',
    },
    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayLabelText: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'poppins-semibold',
    },
    nextBtn: {
        padding: 10,
        width: '100%',
        height: 80,
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    btnText: {
        color: Colors.lightGray2,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'poppins-semibold'
    },

    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    againBtn: {
        flex: 1,
        padding: 10,
        margin: 10,
        height: 60,
        borderRadius: 10,
        backgroundColor: Colors.lightRed,
        justifyContent: 'center',
        alignItems: 'center',
    },
    againText: {
        color: Colors.red,
        fontSize: 16,
        fontFamily: 'poppins-semibold'
    },
    againTimeText: {
        color: Colors.red,
        fontSize: 12,
        fontFamily: 'poppins-italic'
    },
    easyBtn: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        height: 60,
        backgroundColor: Colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    easyText: {
        color: Colors.blue,
        fontSize: 16,
        fontFamily: 'poppins-semibold'
    },
    easyTimeText: {
        color: Colors.blue,
        fontSize: 12,
        fontFamily: 'poppins-italic'
    },
    correctBtn: {
        flex: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        height: 60,
        backgroundColor: Colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    correctText: {
        color: Colors.green,
        fontSize: 16,
        fontFamily: 'poppins-semibold'
    },
    correctTimeText: {
        color: Colors.green,
        fontSize: 12,
        fontFamily: 'poppins-italic'
    },
});