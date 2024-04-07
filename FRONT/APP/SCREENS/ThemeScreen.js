import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Colors from '../SHARED/Colors';
import { CourseContext } from '../CONTEXTS/CourseContext';
import { UserCourseContext } from '../CONTEXTS/UserCourseContext';
import ThemeItem from '../COMPONENTS/THEME/ThemeItem';
import { ChapterContext } from '../CONTEXTS/ChapterContext';
import { UserChapterContext } from '../CONTEXTS/UserChapterContext';

export default function ThemeScreen() {

    const theme = useRoute().params?.theme;
    const [courses, setCourses] = useContext(CourseContext);
    const [chapters, setChapters] = useContext(ChapterContext);
    const [userCourses, setUserCourses] = useContext(UserCourseContext);
    const [coursesFiltered, setCoursesFiltered] = useState([]);
    const [nbCoursesFinished, setnbCoursesFinished] = useState(0);
    const [nbCoursesInProgress, setnbCoursesInProgress] = useState(0);
    const [showDetail, setShowDetail] = useState(true);

    useEffect(() => {
        // filter courses by theme
        let _coursesFiltered = courses.filter(course => course.themeId === theme.id);
        setCoursesFiltered(_coursesFiltered);

        let _nbCoursesFinished = 0;
        let _nbCoursesInProgress = 0;

        _coursesFiltered.forEach(course => {
            let userCourse = userCourses.find(userCourse => userCourse.courseId == course.id);
            if (userCourse && userCourse.status === 'finished')
                _nbCoursesFinished++;
            else if (userCourse && userCourse.status === 'started')
                _nbCoursesInProgress++;

        })
        setnbCoursesFinished(_nbCoursesFinished);
        setnbCoursesInProgress(_nbCoursesInProgress);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>{theme?.title}</Text>
                <View style={styles.separator} />
                <Text style={styles.title}>
                    {coursesFiltered.length + ' Cours (' + (nbCoursesFinished) / coursesFiltered.length * 100 + '% terminé)'}
                </Text>
                <View style={styles.progressLine}>
                    <View style={styles.finishContainer}>
                        <Text style={styles.finishText}>{nbCoursesFinished} terminés</Text>
                    </View>
                    <View style={styles.inProgressContainer}>
                        <Text style={styles.inProgressText}>{nbCoursesInProgress} en cours</Text>
                    </View>
                    <View style={styles.toStudyContainer}>
                        <Text style={styles.toStudyText}>{coursesFiltered.length - nbCoursesFinished - nbCoursesInProgress} restants</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.showDetailBtn}
                    onPress={() => setShowDetail(!showDetail)}>
                    <Text style={styles.showDetailText}>{showDetail ? 'Cacher détail' : 'Voir détail'}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {
                    coursesFiltered && coursesFiltered.map((course, index) => {
                        return (
                            <ThemeItem
                                course={course}
                                userCourse={userCourses?.find(c => c.courseId === course.id)}
                                showDetail={showDetail}
                                key={index} />
                        )
                    })
                }
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
    separator: {
        borderBottomColor: Colors.lightGray2,
        borderBottomWidth: 1,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 50,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
        justifyContent: 'center',
    },
    titleHeader: {
        fontSize: 25,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: 'poppins-light',
        color: Colors.lightGray,
        marginTop: 10,
        textAlign: 'center',
    },
    progressLine: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    finishText: {
        fontSize: 14,
        fontFamily: 'poppins-italic',
        color: Colors.green,
        textAlign: 'center',
    },
    finishContainer: {
        margin: 5,
        padding: 5,
        borderRadius: 10,
        backgroundColor: Colors.lightGreen,
    },
    inProgressText: {
        fontSize: 14,
        fontFamily: 'poppins-italic',
        color: Colors.blue,
        textAlign: 'center',
    },
    inProgressContainer: {
        margin: 5,
        padding: 5,
        borderRadius: 10,
        backgroundColor: Colors.lightBlue,
    },
    toStudyText: {
        fontSize: 14,
        fontFamily: 'poppins-italic',
        color: Colors.red,
        textAlign: 'center',
    },
    toStudyContainer: {
        margin: 5,
        padding: 5,
        borderRadius: 10,
        backgroundColor: Colors.lightRed,
    },
    showDetailText: {
        fontSize: 18,
        fontFamily: 'poppins',
        color: Colors.primary,
        textAlign: 'center',
        borderColor: Colors.white,
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colors.lightGray
    },
})