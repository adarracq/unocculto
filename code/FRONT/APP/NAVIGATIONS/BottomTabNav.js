import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileScreen from '../SCREENS/ProfileScreen';
import HomeScreenNav from './HomeScreenNav';
import ReviewScreenNav from './ReviewScreenNav';
import DuelScreenNav from './DuelScreenNav';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Learn" component={HomeScreenNav}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="library-sharp" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Review" component={ReviewScreenNav}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="open-book" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Fight" component={DuelScreenNav}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="sword-cross" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}