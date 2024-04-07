import { View, Text, StyleSheet, BackHandler, ToastAndroid } from 'react-native'
import { useBackHandler } from '@react-native-community/hooks'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { QuestionContext } from '../CONTEXTS/QuestionContext';
import DuelCardHeader from '../COMPONENTS/DUEL_QUESTIONS/DuelCardHeader';
import Colors from '../SHARED/Colors';
import QuizAnswers from '../COMPONENTS/_GENERAL/QuizAnswers';
import { AuthContext } from '../CONTEXTS/AuthContext';
import { duelService } from '../SERVICES/duel.service';
import { StackActions } from '@react-navigation/native';

export default function DuelQuestionsScreen() {
    const duel = useRoute().params.duel;
    const theme = useRoute().params.theme;
    const selector = useRoute().params.selector;
    const [questions, setQuestions] = useContext(QuestionContext);
    const [duelQuestions, setDuelQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [user, setUser] = useContext(AuthContext);
    const nav = useNavigation();


    const setRandomQuestions = () => {
        let randomQuestions = [];
        for (let i = 0; i < 4; i++) {
            let themeQuestions = questions.filter(question => question.themeId === theme.id);
            let randomIndex = Math.floor(Math.random() * themeQuestions.length);
            // on recommence si la question est déjà dans le tableau
            while (randomQuestions.find(q => q.id === themeQuestions[randomIndex].id)) {
                randomIndex = Math.floor(Math.random() * themeQuestions.length);
            }
            randomQuestions.push(themeQuestions[randomIndex]);
        }
        setDuelQuestions(randomQuestions);
    }

    const getQuestions = () => {
        let _questions = [];
        duel.results[duel.results?.length - 1].questions.forEach(q => {
            let _question = questions.find(question => question.id === q.questionId);
            _question.user1Answer = q.user1Answer;
            _question.user2Answer = q.user2Answer;
            _questions.push(_question);
        });
        setDuelQuestions(_questions);
    }

    const setAnswer = (answer) => {
        let _duelQuestions = duelQuestions;
        if (user.username == duel.username1)
            _duelQuestions[currentQuestion].user1Answer = answer;
        else
            _duelQuestions[currentQuestion].user2Answer = answer;
        setDuelQuestions(_duelQuestions);

        setCurrentQuestion(currentQuestion + 1);
        console.log(currentQuestion);
        console.log(duelQuestions.length);
        duelQuestions.forEach(q => {
            console.log(q);
        }
        );
        if (currentQuestion >= duelQuestions.length - 1)
            setResults();
    }

    const setResults = () => {
        let _selector = '';
        if (selector)
            _selector = user.username;
        else {
            if (user.username == duel.username1)
                _selector = duel.username2;
            else
                _selector = duel.username1;
        }

        let _questions = [];
        duelQuestions.forEach(q => {
            _questions.push({
                questionId: q.id,
                user1Answer: q.user1Answer,
                user2Answer: q.user2Answer,
            })
        });

        // si c'est la première manche
        if (!duel.results) {
            duel.results = [];
            duel.results.push({
                themeId: theme.id,
                selector: _selector,
                questions: _questions
            });
        }
        else {
            if (selector) {
                duel.results.push({
                    themeId: theme.id,
                    selector: _selector,
                    questions: _questions
                });
            }
            else {
                duel.results[duel.results.length - 1] = {
                    themeId: theme.id,
                    selector: _selector,
                    questions: _questions
                }
            }
        }

        duel.status = 1;

        duelService.update(duel).then(() => {
            nav.goBack();
        });
    }

    useBackHandler(() => {
        ToastAndroid.show('Vous ne pouvez pas quitter le duel', ToastAndroid.SHORT);
        return true
    })

    useEffect(() => {
        if (selector)
            setRandomQuestions();
        else
            getQuestions();
    }, [])

    return (
        <View style={styles.container}>
            <DuelCardHeader
                theme={theme}
                question={duelQuestions && duelQuestions[currentQuestion]}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                duel={duel}
                setAnswer={setAnswer}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 40,
    },

})