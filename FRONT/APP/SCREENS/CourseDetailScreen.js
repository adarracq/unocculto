import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../SHARED/Colors';
import { UserFinishChapterContext } from '../CONTEXTS/UserFinishChapterContext';
import ChaptersSection from '../COMPONENTS/COURSE_DETAIL/ChaptersSection';
import DetailSection from '../COMPONENTS/COURSE_DETAIL/DetailSection';
import { AuthContext } from '../CONTEXTS/AuthContext';
import { UserChapterContext } from '../CONTEXTS/UserChapterContext';
import { UserCourseContext } from '../CONTEXTS/UserCourseContext';
import { userCourseService } from '../SERVICES/userCourse.service';
import { userChapterService } from '../SERVICES/userChapter.service';
import { UserCardContext } from '../CONTEXTS/UserCardContext';
import { userCardService } from '../SERVICES/userCard.service';

export default function CourseDetailScreen() {

    const nav = useNavigation();
    const params = useRoute().params;
    const [userData, setUserData] = useContext(AuthContext);
    const [userChapters, setUserChapters] = useContext(UserChapterContext);
    const [userCourses, setUserCourses] = useContext(UserCourseContext);
    const [userCards, setUserCards] = useContext(UserCardContext);
    const [userFinishAChapter, setUserFinishAChapter] = useContext(UserFinishChapterContext);

    useEffect(() => {
        if (userFinishAChapter) {
            getStartedCourse();
            setUserFinishAChapter(false);
        }
    }, [userFinishAChapter])

    const startUserCourse = () => {
        if (!userData) return;

        userCourseService.create({
            courseId: params.course.id,
            userEmail: userData.email
        }).then(resp => {
            if (resp) {
                ToastAndroid.show('Course started', ToastAndroid.SHORT);
                getStartedCourse();
            }
        });
    }

    const getStartedCourse = () => {
        if (userData) {
            userChapterService.getByUserEmail(userData.email).then(resp => { setUserChapters(resp); })
            userCourseService.getByUserEmail(userData.email).then(resp => { setUserCourses(resp); })
            userCardService.getByUserEmail(userData.email).then(resp => { setUserCards(resp); })
        }
    }

    return params.course && (
        <ScrollView >
            <View style={styles.container}>
                <DetailSection
                    course={params.course}
                    startUserCourse={() => startUserCourse()}
                />
                <ChaptersSection
                    course={params.course}
                    started={userCourses?.find(c => c.courseId === params.course.id) ? true : false}
                    userChapters={userChapters}
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
})