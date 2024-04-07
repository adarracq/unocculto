import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../SHARED/Colors';
import { ChapterContext } from '../../CONTEXTS/ChapterContext';

export default function ChaptersSection({ course, started, userChapters }) {

    const nav = useNavigation();

    const [chapters, setChapters] = useContext(ChapterContext);
    const [courseChapters, setCourseChapters] = useState([]);

    const goToChapter = (chapter) => {
        if (started) {
            nav.navigate('ChapterContent', {
                chapter: chapter,
                chapters: courseChapters,
                course: course,
            });
        }
        else {
            ToastAndroid.show('Commencez le cours pour accéder aux chapitres', ToastAndroid.LONG);
        }
    }

    const isCompleted = (chapter) => {
        return userChapters?.find(c => c.chapterId === chapter.id) ? true : false;
    }

    useEffect(() => {
        setCourseChapters(chapters?.filter(c => c.courseId === course.id));
    }, [chapters]);

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Chapitres :</Text>
            {courseChapters.map((chapter, index) => (
                <TouchableOpacity
                    style={isCompleted(chapter) ? styles.chapterCompletedContainer : styles.chapterContainer}
                    key={index}
                    onPress={() => goToChapter(chapter)}
                >
                    {
                        started ?
                            <>
                                {
                                    isCompleted(chapter) ?
                                        <>
                                            <Ionicons name="checkmark-circle" size={30} color={Colors.white} />
                                            <Text style={styles.titleCompleted}>{chapter.title}</Text>
                                        </>
                                        :
                                        <>
                                            <Text style={isCompleted(chapter) ? styles.indexCompleted : styles.index}>{index + 1}</Text>
                                            <Text style={styles.title}>{chapter.title}</Text>
                                            <Ionicons name={"play-circle-sharp"} size={30} color={Colors.white} />
                                        </>
                                }
                            </>
                            :
                            <>
                                <Text style={styles.indexLocked}>{index + 1}</Text>
                                <Text style={styles.titleLocked}>{chapter.title}</Text>
                                <Ionicons name="lock-closed" size={24} color={Colors.gray} />
                            </>
                    }
                </TouchableOpacity>
            ))
            }
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20,
        borderRadius: 15,
        backgroundColor: Colors.primary,
    },
    mainTitle: {
        fontSize: 20,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
    },
    chapterContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        padding: 10,
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
    },
    chapterCompletedContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        padding: 10,
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.green,
        backgroundColor: Colors.lightGreen,
        borderRadius: 10,
    },
    index: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        color: Colors.primary
    },
    indexCompleted: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        color: Colors.white
    },
    indexLocked: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        color: Colors.gray
    },
    title: {
        fontSize: 15,
        fontFamily: 'poppins',
        color: Colors.white,
        width: '85%',
    },
    titleCompleted: {
        fontSize: 15,
        fontFamily: 'poppins',
        color: Colors.white,
        width: '85%',
    },
    titleLocked: {
        fontSize: 15,
        fontFamily: 'poppins',
        color: Colors.gray,
        width: '85%',
    }
})