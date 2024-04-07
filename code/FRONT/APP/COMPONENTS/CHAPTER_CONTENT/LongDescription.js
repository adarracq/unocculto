import { View, Text, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RenderHtml from 'react-native-render-html';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../SHARED/Colors';

export default function LongDescription({ chapter, setCurrentIndex, goToTop }) {

    const [isSimple, setIsSimple] = useState(false);

    return chapter && (
        <View>
            <TouchableOpacity
                onPress={() => setIsSimple(!isSimple)}
                style={styles.changeBtn}>
                {
                    isSimple ?
                        <FontAwesome name="mortar-board" size={24} color={Colors.primary} />
                        :
                        <FontAwesome name="question-circle" size={24} color={Colors.primary} />
                }
                <Text style={styles.btnChangeText}>{isSimple ? 'Aller plus loin' : 'Explique moi simplement'}</Text>
            </TouchableOpacity>
            {
                isSimple ? <RenderHtml
                    contentWidth={useWindowDimensions().width}
                    source={{ html: chapter.simpleDescription }}
                    tagsStyles={TagsStyles}
                /> :
                    <RenderHtml
                        contentWidth={useWindowDimensions().width}
                        source={{ html: chapter.longDescription }}
                        tagsStyles={TagsStyles}
                    />
            }
            <TouchableOpacity
                onPress={() => {
                    setIsSimple(!isSimple);
                    goToTop();
                }}
                style={styles.changeBtn}>
                {
                    isSimple ?
                        <FontAwesome name="mortar-board" size={24} color={Colors.primary} />
                        :
                        <FontAwesome name="question-circle" size={24} color={Colors.primary} />
                }
                <Text style={styles.btnChangeText}>{isSimple ? 'Aller plus loin' : 'Explique moi simplement'}</Text>
            </TouchableOpacity>

            <Divider style={{ marginTop: 0, marginBottom: 20 }} />

            <TouchableOpacity
                onPress={() => setCurrentIndex(2)}
                style={styles.nextBtn}>
                <Text style={styles.btnText}>Suivant</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setCurrentIndex(0)}
                style={styles.precedentBtn}>
                <Text style={styles.btnText}>Précedent</Text>
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
    precedentBtn: {
        backgroundColor: Colors.gray,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20
    },
    btnText: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppins-semibold'
    },
    nextBtn: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
    },
    changeBtn: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    btnChangeText: {
        color: Colors.primary,
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
