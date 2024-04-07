import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ReviewScreen from '../SCREENS/ReviewScreen';
import ReviewCardScreen from '../SCREENS/ReviewCardScreen';

const Stack = createStackNavigator();

export default function ReviewScreenNav() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="ReviewHome" component={ReviewScreen} />
            <Stack.Screen name="ReviewCard" component={ReviewCardScreen} />
        </Stack.Navigator>
    )
}