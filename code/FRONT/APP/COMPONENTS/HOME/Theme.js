import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/';

export default function Theme({ theme, nbCourses, nbCoursesFinished }) {

    const nav = useNavigation();

    const navigate = () => {
        if (theme) {
            nav.navigate('Theme', { theme: theme });
        }
        else {
            // TODO: navigate to random course
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={navigate}>
            <ImageBackground
                source={{ uri: theme ? baseUrl + theme?.imageUrl : baseUrl + 'uploads/img/themes/random.jpeg' }}
                imageStyle={styles.image} style={styles.image}
            >
                <Text style={styles.text}>{theme ? theme.title : "Cours Aléatoire"}</Text>
                {
                    nbCourses ?
                        <Text style={styles.text2}>{nbCourses + ' Cours (' + (nbCoursesFinished / nbCourses * 100) + '% terminé)'}</Text>
                        :
                        <Text style={styles.text2}>Bientot disponible...</Text>
                }
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 20,
        width: '50%',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 2,
        padding: 2,
        flex: 1,
        aspectRatio: 1,
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'poppins-semibold',
        textAlign: 'center',
        backgroundColor: '#000000a0',
    },
    text2: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'poppins-italic',
        textAlign: 'center',
        backgroundColor: '#000000a0',
    },
});