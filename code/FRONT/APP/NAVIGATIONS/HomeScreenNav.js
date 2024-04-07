import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../SCREENS/HomeScreen';
import ThemeScreen from '../SCREENS/ThemeScreen';
import CourseDetailScreen from '../SCREENS/CourseDetailScreen';
import ChapterContentScreen from '../SCREENS/ChapterContentScreen';

const Stack = createStackNavigator();

export default function HomeScreenNav() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Theme" component={ThemeScreen} />
            <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
            <Stack.Screen name="ChapterContent" component={ChapterContentScreen} />
        </Stack.Navigator>
    )
}