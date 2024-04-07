import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../SHARED/Colors'
import { ChapterContext } from '../../CONTEXTS/ChapterContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserChapterContext } from '../../CONTEXTS/UserChapterContext';
import ThemeProgressBar from './ThemeProgressBar';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function ThemeItem({ course, userCourse, showDetail }) {

    const nav = useNavigation();

    const [chapters, setChapters] = useContext(ChapterContext);
    const [userChapter, setUserChapter] = useContext(UserChapterContext);
    const [chaptersFiltered, setChaptersFiltered] = useState([]);

    const [status, setStatus] = useState('not-started');
    const [percentage, setPercentage] = useState(0);


    useEffect(() => {
        if (chapters) {
            setChaptersFiltered(chapters.filter(chapter => chapter.courseId === course.id));
        }
    }, [course, chapters]);

    useEffect(() => {
        if (userCourse) {
            setStatus(userCourse.status);
        }
    }, [userCourse]);

    useEffect(() => {
        if (userChapter) {
            let nbCompletedChapter = userChapter.filter(chapter => chapter.courseId === course.id).length;
            let nbTotalChapter = chaptersFiltered.length;
            setPercentage((nbCompletedChapter / nbTotalChapter) * 100 + '%');
        }
    }, [userChapter, chaptersFiltered]);

    return showDetail ?
        <TouchableOpacity
            onPress={() => nav.navigate('CourseDetail', { course: course })}
            style={status == 'started' ? styles.courseStarted : status == 'finished' ? styles.courseFinished : styles.course}>
            <Image source={{ uri: baseUrl + course?.imageUrl }} style={styles.banner} />
            <View>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={[{ justifyContent: 'space-between' }, styles.bottomCourse]}>
                    <View style={styles.option}>
                        <Ionicons name="book-outline" size={18} color={Colors.white} />
                        <Text style={styles.optionText}>{chaptersFiltered?.length + ' Chapitres'}</Text>
                    </View>
                    <View style={styles.option}>
                        <Ionicons name="time" size={18} color={Colors.white} />
                        <Text style={styles.optionText}>30min</Text>
                    </View>
                </View>
                {
                    status === 'finished' &&
                    <View style={styles.statusView}>
                        <Ionicons name="checkmark-done-circle-outline" size={18} color={Colors.white} />
                        <Text style={styles.optionText}>Terminé</Text>
                    </View>
                }
                {
                    status === 'started' &&
                    <>
                        <View style={styles.statusView}>
                            <Ionicons name="play-circle-outline" size={18} color={Colors.white} />
                            <Text style={styles.optionText}>{'En cours (' + percentage + ')'}</Text>
                        </View>
                        <View style={styles.statusView}>
                            <ThemeProgressBar
                                percentage={percentage}
                            />
                        </View>
                    </>
                }
                {
                    status === 'not-started' &&
                    <View style={styles.statusView}>
                        <Ionicons name="play-circle-outline" size={18} color={Colors.white} />
                        <Text style={styles.optionText}>Commencer</Text>
                    </View>
                }
            </View>
            {/*
                completedChapter > 0 &&
                <>
                    <OptionItem icon="rocket-outline" value={percentage} color={Colors.primary} />
                    <CourseProgressBar
                        percentage={percentage}
                    />
                </>
           */ }
        </TouchableOpacity>
        :
        <TouchableOpacity
            onPress={() => nav.navigate('CourseDetail', { course: course })}
            style={status == 'started' ? styles.courseStarted : status == 'finished' ? styles.courseFinished : styles.course}>
            <View>
                <Text style={styles.courseTitle}>{course.title}</Text>
                {
                    status === 'finished' &&
                    <View style={styles.statusView}>
                        <Ionicons name="checkmark-done-circle-outline" size={18} color={Colors.white} />
                        <Text style={styles.optionText}>Terminé</Text>
                    </View>
                }
                {
                    status === 'started' &&
                    <>
                        <View style={styles.statusView}>
                            <Ionicons name="play-circle-outline" size={18} color={Colors.white} />
                            <Text style={styles.optionText}>{'En cours (' + percentage + ')'}</Text>
                        </View>
                    </>
                }
                {
                    status === 'not-started' &&
                    <View style={styles.statusView}>
                        <Ionicons name="play-circle-outline" size={18} color={Colors.white} />
                        <Text style={styles.optionText}>Commencer</Text>
                    </View>
                }
            </View>
        </TouchableOpacity>

}

const styles = StyleSheet.create({
    course: {
        padding: 10,
        margin: 10,
        backgroundColor: Colors.lightRed,
        borderRadius: 20,
        paddingBottom: 20,
        elevation: 10,
    },
    courseStarted: {
        padding: 10,
        margin: 10,
        backgroundColor: Colors.lightBlue,
        borderRadius: 20,
        paddingBottom: 20,
        elevation: 10,
    },
    courseFinished: {
        padding: 10,
        margin: 10,
        backgroundColor: Colors.lightGreen,
        borderRadius: 20,
        paddingBottom: 20,
    },
    banner: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    },
    courseTitle: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: 'poppins-semibold',
        color: Colors.white
    },
    courseText: {
        fontSize: 14,
        fontFamily: 'poppins',
    },
    bottomCourse: {
        flexDirection: 'row',
        marginTop: 5,
        gap: 5
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        gap: 5
    },
    statusView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        gap: 5
    },
    optionText: {
        fontSize: 14,
        fontFamily: 'poppins',
        color: Colors.white
    },
})