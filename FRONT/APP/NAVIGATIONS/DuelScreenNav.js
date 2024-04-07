import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DuelScreen from '../SCREENS/DuelScreen';
import DuelRecapScreen from '../SCREENS/DuelRecapScreen';
import DuelQuestionsScreen from '../SCREENS/DuelQuestionsScreen';
import DuelSelectThemeScreen from '../SCREENS/DuelSelectThemeScreen';

const Stack = createStackNavigator();

export default function DuelScreenNav() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Duel" component={DuelScreen} />
            <Stack.Screen name="DuelRecap" component={DuelRecapScreen} />
            <Stack.Screen name="SelectTheme" component={DuelSelectThemeScreen} />
            <Stack.Screen name="DuelQuestions" component={DuelQuestionsScreen} />
        </Stack.Navigator>
    )
}