import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import ProgressBar from 'react-native-progress/Bar';
import Colors from '../../SHARED/Colors';
import { UserChapterContext } from '../../CONTEXTS/UserChapterContext';
import { ChapterContext } from '../../CONTEXTS/ChapterContext';

export default function Congrats({ chapter, onChapterFinish }) {

    const countInterval = useRef(null);
    const [count, setCount] = useState(0);
    const [chapters, setChapters] = useContext(ChapterContext);
    const [userChapters, setUserChapters] = useContext(UserChapterContext);
    const [percEnd, setPercEnd] = useState(0);

    useEffect(() => {
        let nbUserChapters = userChapters?.filter(c => c.courseId === chapter.courseId)?.length;
        let totalChapters = chapters?.filter(c => c.courseId === chapter.courseId)?.length;

        if (userChapters.find(c => c.chapterId === chapter.id) == undefined)
            setPercEnd((nbUserChapters + 1) / totalChapters * 100);
        else
            setPercEnd(nbUserChapters / totalChapters * 100);

    }, [userChapters, chapters]);

    useEffect(() => {
        // SETUP INTERVAL COUNTER TO REFERENCED HOOK

        countInterval.current = setInterval(() => setCount((prev) => prev + 1), 50);

        return () => {
            // CLEAR ON EXIT
            clearInterval(countInterval);
        };
    }, [percEnd]);

    useEffect(() => {
        if (count >= percEnd) {
            setCount(percEnd);
            clearInterval(countInterval.current);
        }
    }, [count]);

    const onClickFinish = () => {
        ToastAndroid.show('Chapitre terminé', ToastAndroid.LONG);
        onChapterFinish();
    }

    return (
        <View style={styles.container}>
            <AntDesign style={styles.star} name="star" size={80} color={Colors.yellow} />
            <Text style={styles.congratsText}>Felicitation !</Text>
            <Text style={styles.finishText}>{count == 100 ? 'Cours Terminé' : 'Progression du cours'}</Text>
            <ProgressBar
                progress={count / 100}
                width={200}
                color={Colors.white}
            />
            <Text style={styles.finishText}>{count}%</Text>
            <TouchableOpacity
                onPress={() => { onClickFinish() }}
                style={styles.nextBtn}>
                <Text style={styles.btnText}>Continuer</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginTop: 60
    },
    star: {
        marginTop: -55
    },
    congratsText: {
        color: Colors.white,
        fontSize: 24,
        fontFamily: 'poppins-semibold'
    },
    finishText: {
        color: Colors.white,
        fontFamily: 'poppins',
        fontSize: 18,
        marginBottom: 20
    },
    nextBtn: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    btnText: {
        color: Colors.primary,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppins-semibold'
    },
    container2: {
        height: 20,
        backgroundColor: '#ccc',
        borderRadius: 10,
        margin: 10,
    },
    bar: {
        height: 20,
        backgroundColor: '#333',
        borderRadius: 10,
    },
})