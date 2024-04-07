import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from 'expo-font';
import LoginScreen from "./APP/SCREENS/LoginScreen";
import { AuthContext } from "./APP/CONTEXTS/AuthContext";
import Services from "./APP/SHARED/Services";
import BottomTabNav from "./APP/NAVIGATIONS/BottomTabNav";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "./APP/CONTEXTS/ThemeContext";
import { CourseContext } from "./APP/CONTEXTS/CourseContext";
import { ChapterContext } from "./APP/CONTEXTS/ChapterContext";
import { UserFinishChapterContext } from "./APP/CONTEXTS/UserFinishChapterContext";
import { UserChapterContext } from "./APP/CONTEXTS/UserChapterContext";
import { UserCourseContext } from "./APP/CONTEXTS/UserCourseContext";
import { QuestionContext } from "./APP/CONTEXTS/QuestionContext";
import { UserCardContext } from "./APP/CONTEXTS/UserCardContext";
import Colors from './APP/SHARED/Colors';

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'poppins': require('./APP/ASSETS/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./APP/ASSETS/fonts/Poppins-Bold.ttf'),
    'poppins-light': require('./APP/ASSETS/fonts/Poppins-Light.ttf'),
    'poppins-medium': require('./APP/ASSETS/fonts/Poppins-Medium.ttf'),
    'poppins-semibold': require('./APP/ASSETS/fonts/Poppins-SemiBold.ttf'),
    'poppins-italic': require('./APP/ASSETS/fonts/Poppins-Italic.ttf'),
  });

  const [userData, setUserData] = useState();
  const [userFinishAChapter, setUserFinishAChapter] = useState(false);
  const [themes, setThemes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userChapters, setUserChapters] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    // on récupère les données de l'utilisateur dans le local storage
    Services.getUserAuth().then(resp => {
      if (resp) {
        // on les enregistre dans le contexte
        setUserData(resp);
      }
      else {
        setUserData(null)
      }
    })
  }, [])


  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <AuthContext.Provider
          value={[userData, setUserData]}>
          <UserFinishChapterContext.Provider
            value={[userFinishAChapter, setUserFinishAChapter]}>
            <UserChapterContext.Provider
              value={[userChapters, setUserChapters]}>
              <UserCourseContext.Provider
                value={[userCourses, setUserCourses]}>
                <UserCardContext.Provider
                  value={[userCards, setUserCards]}>
                  <ThemeContext.Provider
                    value={[themes, setThemes]}>
                    <CourseContext.Provider
                      value={[courses, setCourses]}>
                      <ChapterContext.Provider
                        value={[chapters, setChapters]}>
                        <QuestionContext.Provider
                          value={[questions, setQuestions]}>

                          <SignedIn>
                            <NavigationContainer>
                              <BottomTabNav />
                            </NavigationContainer>
                          </SignedIn>
                          <SignedOut>
                            {
                              userData ?
                                <NavigationContainer>
                                  <BottomTabNav />
                                </NavigationContainer>
                                :
                                <LoginScreen />
                            }
                          </SignedOut>

                        </QuestionContext.Provider>
                      </ChapterContext.Provider>
                    </CourseContext.Provider>
                  </ThemeContext.Provider>
                </UserCardContext.Provider>
              </UserCourseContext.Provider>
            </UserChapterContext.Provider>
          </UserFinishChapterContext.Provider>
        </AuthContext.Provider>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey
  },
});