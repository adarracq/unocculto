import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { UserFinishChapterContext } from '../CONTEXTS/UserFinishChapterContext';
import { AuthContext } from '../CONTEXTS/AuthContext';
import { UserChapterContext } from '../CONTEXTS/UserChapterContext';
import { userChapterService } from '../SERVICES/userChapter.service';
import Content from '../COMPONENTS/CHAPTER_CONTENT/Content';
import { userService } from '../SERVICES/user.service';
import Services from '../SHARED/Services';
import { userCourseService } from '../SERVICES/userCourse.service';
import { UserCourseContext } from '../CONTEXTS/UserCourseContext';
import { userCardService } from '../SERVICES/userCard.service';
import { QuestionContext } from '../CONTEXTS/QuestionContext';

export default function ChapterContentScreen() {

    const params = useRoute().params;
    const nav = useNavigation();
    const [userData, setUserData] = useContext(AuthContext);
    const [userChapters, setUserChapters] = useContext(UserChapterContext);
    const [userCourses, setUserCourses] = useContext(UserCourseContext);
    const [questions, setQuestions] = useContext(QuestionContext);

    const [userFinishAChapter, setUserFinishAChapter] = useContext(UserFinishChapterContext);

    const onChapterFinish = () => {
        let alreadyFinished = userChapters?.find(c => c.chapterId === params.chapter.id);

        if (alreadyFinished) {
            nav.goBack();
        }
        else {
            userData.coins = Number(userData.coins) + 5;
            setUserData(userData);
            Services.setUserAuth(userData);
            userService.update(userData);


            questions.forEach(q => {
                if (q.chapterId === params.chapter.id) {
                    userCardService.create({
                        userEmail: userData.email,
                        questionId: q.id,
                        level: 0,
                        //nextReview: new Date(new Date().setDate(new Date().getDate() + 1)),
                        themeId: q.themeId
                    });
                }
            });

            userChapterService.create({
                chapterId: params.chapter.id,
                userEmail: userData.email,
                courseId: params.course.id
            }).then((resp) => {
                if (resp) {
                    // if course is finished, update it
                    let _userChapters = userChapters?.filter(c => c.courseId === params.course.id);
                    let chapters = params.chapters;

                    if (_userChapters?.length >= chapters.length - 1) {
                        let userCourse = userCourses?.find(c => c.courseId === params.course.id);
                        userCourse.status = "finished";
                        userCourseService.update(userCourse).then((resp) => {
                            if (resp) {
                                setUserFinishAChapter(true);
                                nav.goBack();
                            }
                        });
                    }
                    else {
                        setUserFinishAChapter(true);
                        nav.goBack();
                    }
                }
            });
        }
    }

    return params.chapter && (
        <View>
            <Content chapter={params.chapter} onChapterFinish={onChapterFinish} />
        </View>
    )
}