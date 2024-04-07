import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useUser } from "@clerk/clerk-expo";
import { AuthContext } from '../CONTEXTS/AuthContext';
import Services from '../SHARED/Services';
import Header from '../COMPONENTS/HOME/Header';
import { userService } from '../SERVICES/user.service';
import Theme from '../COMPONENTS/HOME/Theme';
import { themeService } from '../SERVICES/theme.service';
import { courseService } from '../SERVICES/course.service';
import { ThemeContext } from '../CONTEXTS/ThemeContext';
import { CourseContext } from '../CONTEXTS/CourseContext';
import { ChapterContext } from '../CONTEXTS/ChapterContext';
import { chapterService } from '../SERVICES/chapter.service';
import { UserChapterContext } from '../CONTEXTS/UserChapterContext';
import { UserCourseContext } from '../CONTEXTS/UserCourseContext';
import { userChapterService } from '../SERVICES/userChapter.service';
import { userCourseService } from '../SERVICES/userCourse.service';
import { QuestionContext } from '../CONTEXTS/QuestionContext';
import { questionService } from '../SERVICES/question.service';
import { UserCardContext } from '../CONTEXTS/UserCardContext';
import { userCardService } from '../SERVICES/userCard.service';


export default function HomeScreen() {

    const { isLoaded, isSignedIn, user } = useUser();
    const [userData, setUserData] = useContext(AuthContext);

    const [search, setSearch] = useState('');
    const [themes, setThemes] = useContext(ThemeContext);
    const [courses, setCourses] = useContext(CourseContext);
    const [chapters, setChapters] = useContext(ChapterContext);
    const [questions, setQuestions] = useContext(QuestionContext);
    const [userChapters, setUserChapters] = useContext(UserChapterContext);
    const [userCourses, setUserCourses] = useContext(UserCourseContext);
    const [userCards, setUserCards] = useContext(UserCardContext);

    const createOrGetUser = async (_user) => {
        userService.create(_user).then(resp => {
            if (resp) {
                setUserData(resp);
                Services.setUserAuth(resp);
            }
        });
    }

    useEffect(() => {
        // si il n y a rien d'enregistré dans le contexte et que l'utilisateur s'est connecté par google (clerk)
        // on enregistre les données de l'utilisateur dans le contexte
        // et on les enregistre dans le local storage
        // et on les enregistre dans la base de données
        if (user && !userData) {
            let _user = {
                email: user.primaryEmailAddress.emailAddress,
                firstname: user.firstName,
                lastname: user.lastName,
                imageUrl: user.imageUrl
            }
            createOrGetUser(_user);
        }
        // si il y a quelque chose d'enregistré dans le contexte
        // on récupère les données de l'utilisateur dans la bdd
        else if (userData) {
            let _user = {
                email: userData.email,
                firstname: userData.firstname,
                lastname: userData.lastname,
                imageUrl: userData.imageUrl
            }
            createOrGetUser(_user);
        }
    }, [user])

    useEffect(() => {
        themeService.getAll().then(resp => { setThemes(resp); })
        courseService.getAll().then(resp => { setCourses(resp); })
        chapterService.getAll().then(resp => { setChapters(resp); })
        questionService.getAll().then(resp => { setQuestions(resp); })
    }, []);

    useEffect(() => {
        if (userData) {
            userChapterService.getByUserEmail(userData.email).then(resp => { setUserChapters(resp); })
            userCourseService.getByUserEmail(userData.email).then(resp => { setUserCourses(resp); })
            userCardService.getByUserEmail(userData.email).then(resp => { setUserCards(resp); })
        }
    }, [userData]);


    const getNbCoursesFinished = (theme) => {
        let _nbCoursesFinished = 0;
        courses.forEach(course => {
            let userCourse = userCourses.find(userCourse => userCourse.courseId == course.id && course.themeId === theme.id);
            if (userCourse && userCourse.status == 'finished')
                _nbCoursesFinished++;
        })
        return _nbCoursesFinished;
    }

    return (
        <ScrollView>
            <Header search={search} setSearch={setSearch} />
            <View style={styles.container}>
                {
                    themes && themes.map((theme, index) => {
                        if (index % 2 === 0) {
                            return (
                                <View style={styles.lineContainer} key={index}>
                                    <Theme
                                        theme={theme}
                                        nbCourses={courses.filter(course => course.themeId === theme.id).length}
                                        nbCoursesFinished={getNbCoursesFinished(theme)}
                                    />
                                    {
                                        themes[index + 1] &&
                                        <Theme
                                            theme={themes[index + 1]}
                                            nbCourses={courses.filter(course => course.themeId === themes[index + 1].id).length}
                                            nbCoursesFinished={getNbCoursesFinished(themes[index + 1])}
                                        />
                                    }
                                </View>
                            )
                        }
                    })
                }
                <View style={styles.lineContainer}>
                    <Theme
                        theme={null}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 2,
        paddingRight: 2,
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 4,
    },
})