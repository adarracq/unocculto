import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../SHARED/Colors'

export default function ThemeProgressBar({ percentage }) {

    return (
        <View style={{
            width: '100%',
            height: 7,
            backgroundColor: Colors.lightGray,
            borderRadius: 100,

        }}
        >
            <View style={{
                width: percentage,
                height: 7,
                backgroundColor: Colors.lightGreen,
                borderRadius: 100,

            }}
            >
            </View>
        </View >
    )
}