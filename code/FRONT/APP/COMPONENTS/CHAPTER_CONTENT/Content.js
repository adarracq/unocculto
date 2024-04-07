import { View, Text, StyleSheet, Image, TouchableOpacity, BackHandler, FlatList } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ProgressBar from './ProgressBar'
import ShortDescription from './ShortDescription';
import { ScrollView } from 'react-native-gesture-handler';
import LongDescription from './LongDescription';
import { useNavigation } from '@react-navigation/native';
import Congrats from './Congrats';
import { QuestionContext } from '../../CONTEXTS/QuestionContext';
import QuizAnswers from '../_GENERAL/QuizAnswers';
import Colors from '../../SHARED/Colors';
import { TabView, SceneMap } from 'react-native-tab-view';
import Map from './Map';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function Content({ chapter, onChapterFinish }) {

    const navigation = useNavigation();
    const scrollRef = useRef();

    const [questions, setQuestions] = useContext(QuestionContext);
    const [chapterQuestions, setChapterQuestions] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToTop = () => {
        scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }

    const goToBottom = () => {
        scrollRef.current.scrollToEnd({ animated: true });
    }

    useEffect(() => {
        if (chapter) {
            let _chapterQuestions = questions.filter(q => q.chapterId == chapter.id);
            setChapterQuestions(_chapterQuestions);
            setTotalPage(_chapterQuestions.length + 3);
        }
    }, [questions]);

    /*BackHandler.addEventListener('hardwareBackPress', function () {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
        else {
            navigation.goBack();
        }
        return true;
    });*/


    return chapter && (
        <View style={styles.container}>
            <ProgressBar currentIndex={currentIndex} nbBar={chapterQuestions?.length + 3} />

            <ScrollView ref={scrollRef}>
                {
                    // pour la geographie
                    chapter.themeId == 11 ?
                        <Map chapter={chapter} />
                        :
                        <Image source={{ uri: baseUrl + chapter.imageUrl }} style={styles.image} />
                }
                <Text style={styles.title}>{chapter.title}</Text>
                {currentIndex == 0 && <ShortDescription description={chapter.shortDescription} setCurrentIndex={setCurrentIndex} />}
                {currentIndex == 1 && <LongDescription chapter={chapter} setCurrentIndex={setCurrentIndex} goToTop={goToTop} />}
                {/*currentIndex == 2 && <Quiz chapter={chapter} setCurrentIndex={setCurrentIndex} goToBottom={goToBottom} />*/}
                {
                    chapterQuestions.map((question, index) => {
                        if (currentIndex == index + 2) {
                            return <QuizAnswers
                                key={question.id}
                                question={question}
                                next={() => setCurrentIndex(currentIndex + 1)}
                                back={() => setCurrentIndex(0)}
                                textBack="Retour au cours"
                                goToBottom={goToBottom} />
                        }
                    })
                }
                {currentIndex == totalPage - 1 && <Congrats chapter={chapter} onChapterFinish={onChapterFinish} />}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 20,
        paddingBottom: 40,
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 20,
        borderRadius: 15
    },
    title: {
        fontSize: 20,
        fontFamily: 'poppins-semibold',
        marginTop: 20,
        textAlign: 'center'
    },

})