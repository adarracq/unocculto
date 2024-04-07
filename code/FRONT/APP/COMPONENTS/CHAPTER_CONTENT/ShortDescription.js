import { View, Text, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import RenderHtml from 'react-native-render-html';
import Colors from '../../SHARED/Colors';

export default function ShortDescription({ description, setCurrentIndex }) {


    return description && (
        <View>
            <RenderHtml
                contentWidth={useWindowDimensions().width}
                source={{ html: description }}
                tagsStyles={TagsStyles}
            />
            <TouchableOpacity
                onPress={() => setCurrentIndex(1)}
                style={styles.nextBtn}>
                <Text style={styles.btnText}>En savoir plus</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    nextBtn: {
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

const TagsStyles = {
    p: {
        fontSize: 16,
        fontFamily: 'poppins-regular',
        color: '#333',
        lineHeight: 24,
        textAlign: 'justify'
    }
}
