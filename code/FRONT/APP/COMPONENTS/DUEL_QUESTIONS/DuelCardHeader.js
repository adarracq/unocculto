import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FlipCard from 'react-native-flip-card'
import Colors from '../../SHARED/Colors';
import QuizAnswers from '../_GENERAL/QuizAnswers';
import { useNavigation } from '@react-navigation/native';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function DuelCardHeader({ theme, question, currentQuestion, setCurrentQuestion, duel, setAnswer }) {

    const [isFlipped, setIsFlipped] = useState(false);
    const [flip, setFlip] = useState(false);

    const goodAnswer = () => {
        if (currentQuestion < 4) {
            setAnswer(true);
            setFlip(!flip);
        }
    }

    const wrongAnswer = () => {
        if (currentQuestion < 4) {
            setAnswer(false);
            setFlip(!flip);
        }
    }

    // on empeche le flip si la question est deja affichée
    useEffect(() => {
        if (isFlipped) {
        }
    }, [isFlipped])

    return (
        <View
            style={styles.cardContainer}
            pointerEvents="box-none"
        >
            <FlipCard
                friction={20}
                perspective={800}
                flipHorizontal={true}
                flipVertical={false}
                flip={flip}
                onFlipStart={() => {
                    setIsFlipped(!isFlipped);
                }}
                onFlipEnd={() => {
                }}
            >
                <View style={styles.rectoCard}>
                    <Image
                        source={{ uri: theme ? baseUrl + theme?.imageUrl : baseUrl + 'uploads/img/themes/random.jpeg' }}
                        style={styles.image} />
                    <Text style={styles.theme}>{theme ? theme.title : "Cours Aléatoire"}</Text>
                    <Text style={styles.text}>{'Question ' + parseInt(currentQuestion + 1, 10) + '/4'}</Text>
                    <View style={styles.startBtn}>
                        <Text style={styles.startText}>Commencer</Text>
                    </View>

                </View>
                <View style={styles.versoCard}>
                    {question &&
                        <>
                            <Image
                                source={{ uri: question ? baseUrl + question?.imageUrl : baseUrl + 'uploads/img/themes/random.jpeg' }}
                                style={styles.image} />
                            <QuizAnswers
                                onRef={ref => (this.child = ref)}
                                question={question}
                                goToBottom={() => { }}
                                next={goodAnswer}
                                back={wrongAnswer}
                                textBack={"Suivant"}
                                inverseColor={false}
                                isTimer={true}
                            />
                        </>}
                </View>
            </FlipCard>
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
    },
    rectoCard: {
        width: Dimensions.get('window').width - 16,
        height: Dimensions.get('window').height - 80,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    versoCard: {
        width: Dimensions.get('window').width - 16,
        height: Dimensions.get('window').height - 80,
        backgroundColor: Colors.white,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        gap: 20,

    },
    image: {
        width: '100%',
        height: 300,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    theme: {
        fontSize: 24,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    startBtn: {
        padding: 10,
        width: '100%',
        height: 80,
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    startText: {
        color: Colors.lightGray2,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'poppins-semibold'
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'poppins-italic',
    },
});