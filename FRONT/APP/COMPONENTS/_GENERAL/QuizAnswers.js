import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../SHARED/Colors';
import ProgressBar from 'react-native-progress/Bar';

export default function QuizAnswers({ question, goToBottom, next, back, textBack, inverseColor, isTimer }) {

    const [answers, setAnswers] = useState([]);
    const [userAnswer, setUserAnswer] = useState(null);
    const [goodAnswer, setGoodAnswer] = useState(null);
    const [realAnswer, setRealAnswer] = useState(null);
    const [timer, setTimer] = useState(100);
    const [quizStarted, setQuizStarted] = useState(true);

    function getRandomAnswersOrder() {
        let answer = question.answer;
        let wrongAnswer1 = question.wrongAnswer1;
        let wrongAnswer2 = question.wrongAnswer2;
        let wrongAnswer3 = question.wrongAnswer3;

        let answers = [answer, wrongAnswer1, wrongAnswer2, wrongAnswer3];
        let randomAnswers = [];
        let i = 0;
        while (i < 4) {
            let randomIndex = Math.floor(Math.random() * answers.length);
            randomAnswers.push(answers[randomIndex]);
            answers.splice(randomIndex, 1);
            i++;
        }
        return randomAnswers;
    }

    // on press of an answer
    const answerPressed = (answer, answers) => {

        setQuizStarted(false);

        if (userAnswer) {
            //ToastAndroid.show('Vous avez déjà répondu', ToastAndroid.SHORT);
            return;
        }

        setUserAnswer(answer);

        if (goToBottom)
            goToBottom();

        if (answer == question.answer) {
            // correct answer
            setGoodAnswer(true);
        }
        else {
            // wrong answer
            setGoodAnswer(false);
            //show the good answer
            setRealAnswer(answers.find(a => a == question.answer));
        }
    }

    useEffect(() => {
        if (quizStarted) {
            const interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        answerPressed('', answers);
                        return 0;
                    }
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [quizStarted, answers]);


    useEffect(() => {
        setAnswers(getRandomAnswersOrder());
    }, [])

    return question && answers.length > 0 && (
        <View>
            <View style={inverseColor ? styles.containerInverse : styles.container}>

                <Text style={inverseColor ? styles.questionInverse : styles.question}>{question.question}</Text>

                <View style={styles.answersLine}>
                    <TouchableOpacity style={
                        answers[0] == userAnswer ?
                            goodAnswer ?
                                styles.goodAnswer : styles.wrongAnswer : answers[0] == realAnswer ? styles.goodAnswer : styles.answer}
                        onPress={() => { answerPressed(answers[0], answers) }}>
                        <Text style={styles.answerText}>{answers[0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={
                        answers[1] == userAnswer ?
                            goodAnswer ?
                                styles.goodAnswer : styles.wrongAnswer : answers[1] == realAnswer ? styles.goodAnswer : styles.answer}
                        onPress={() => { answerPressed(answers[1], answers) }}>
                        <Text style={styles.answerText}>{answers[1]}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.answersLine}>
                    <TouchableOpacity style={
                        answers[2] == userAnswer ?
                            goodAnswer ?
                                styles.goodAnswer : styles.wrongAnswer : answers[2] == realAnswer ? styles.goodAnswer : styles.answer}
                        onPress={() => { answerPressed(answers[2], answers) }}>
                        <Text style={styles.answerText}>{answers[2]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={
                        answers[3] == userAnswer ?
                            goodAnswer ?
                                styles.goodAnswer : styles.wrongAnswer : answers[3] == realAnswer ? styles.goodAnswer : styles.answer}
                        onPress={() => { answerPressed(answers[3], answers) }}>
                        <Text style={styles.answerText}>{answers[3]}</Text>
                    </TouchableOpacity>
                </View>
                {
                    isTimer &&
                    <>
                        {
                            timer > 0 ?
                                <>
                                    <Text style={styles.question}>{'Temps restant : ' + Math.round(timer / 10) + 's'}</Text>
                                    <ProgressBar
                                        progress={timer / 100}
                                        width={Dimensions.get("window").width - 60}
                                        color={Colors.lightBlue}
                                    />
                                </>
                                :
                                <Text style={styles.question}>Temps écoulé...</Text>
                        }

                    </>

                }
            </View>
            {
                goodAnswer &&
                <View>
                    <Text style={styles.resultText}>Bonne réponse !</Text>
                    <TouchableOpacity
                        onPress={next}
                        style={styles.goodBtn}>
                        <Text style={styles.btnText}> Continuer</Text>
                    </TouchableOpacity>
                </View>
            }
            {
                goodAnswer === false &&
                <View>
                    <Text style={styles.resultText}>Mauvaise réponse...</Text>
                    <TouchableOpacity
                        onPress={back}
                        style={styles.wrongBtn}>
                        <Text style={styles.btnText}>{textBack}</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.white,
        width: '100%',
    },
    containerInverse: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        width: '100%',
    },
    question: {
        fontSize: 18,
        fontFamily: 'poppins-italic',
        textAlign: 'center'
    },
    questionInverse: {
        fontSize: 18,
        fontFamily: 'poppins-italic',
        textAlign: 'center',
        color: Colors.white
    },
    answersLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    answer: {
        backgroundColor: Colors.primary,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        margin: 5,
        color: Colors.white,
        flex: 1,
        textAlign: 'center',
    },
    goodAnswer: {
        backgroundColor: Colors.green,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        margin: 5,
        color: Colors.white,
        flex: 1,
        textAlign: 'center',
    },
    wrongAnswer: {
        backgroundColor: Colors.red,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        margin: 5,
        color: Colors.white,
        flex: 1,
        textAlign: 'center',
    },
    answerText: {
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'poppins-semibold'
    },
    goodBtn: {
        backgroundColor: Colors.green,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20
    },
    wrongBtn: {
        backgroundColor: Colors.red,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20
    },
    btnText: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppins-semibold'
    },
    resultText: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        textAlign: 'center',
    }
})