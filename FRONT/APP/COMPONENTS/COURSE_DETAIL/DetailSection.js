import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import OptionItem from './OptionItem'
import Colors from '../../SHARED/Colors';
import { UserChapterContext } from '../../CONTEXTS/UserChapterContext';
import { UserCourseContext } from '../../CONTEXTS/UserCourseContext';
import { ChapterContext } from '../../CONTEXTS/ChapterContext';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function DetailSection({ course, startUserCourse }) {

    const [chapters, setChapters] = useContext(ChapterContext);
    const [userChapters, setUserChapters] = useContext(UserChapterContext);
    const [userCourses, setUserCourses] = useContext(UserCourseContext);
    const [userCourse, setUserCourse] = useState(null);
    const [totalChapters, setTotalChapters] = useState(0);
    const [percEnd, setPercEnd] = useState(0);

    useEffect(() => {

        setUserCourse(userCourses?.find(c => c.courseId === course.id));
        let nbUserChapters = userChapters?.filter(c => c.courseId === course.id)?.length;
        let totalChapters = chapters?.filter(c => c.courseId === course.id)?.length;
        setPercEnd(nbUserChapters / totalChapters * 100);
        setTotalChapters(totalChapters);

    }, [userCourses, userChapters, chapters]);



    return (
        <View>
            <View style={styles.container}>
                <Image source={{ uri: baseUrl + course?.imageUrl }} style={styles.banner} />

                <View style={{ padding: 10 }}>
                    <Text style={styles.title}>{course.title}</Text>

                    <View style={styles.option}>
                        <OptionItem icon="book-outline" value={totalChapters + ' Chapitres'} color={Colors.primary} />
                        <OptionItem icon="time-outline" value="30min" color={Colors.primary} />
                    </View>
                    <View style={styles.option}>
                        <OptionItem color={Colors.primary} />
                        <OptionItem icon="rocket-outline" value={percEnd + "%"} color={Colors.primary} />
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <Text style={styles.descrTitle}>Description</Text>
                    <Text style={styles.description}>{course.description}</Text>
                </View>

                {userCourse != null ||
                    <View style={{ padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => startUserCourse()}
                            style={styles.startCourseBtn}>
                            <Text style={styles.btnText}>Commencer le cours</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: Colors.primary,
    },
    banner: {
        width: '100%',
        height: 200,
        borderRadius: 15
    },
    title: {
        fontSize: 24,
        fontFamily: 'poppins-semibold',
        marginTop: 20,
        color: Colors.white
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,

    },
    descrTitle: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        marginTop: 20,
        color: Colors.white
    },
    description: {
        fontSize: 14,
        fontFamily: 'poppins-italic',
        textAlign: 'justify',
        color: Colors.white
    },
    startCourseBtn: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
    },
    btnText: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppins-semibold'
    }
})