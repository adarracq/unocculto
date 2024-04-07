import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../CONTEXTS/AuthContext';
import Colors from '../SHARED/Colors';
import UserProfile from '../COMPONENTS/PROFILE/UserProfile';
import UserStats from '../COMPONENTS/PROFILE/UserStats';
import AddFriend from '../COMPONENTS/PROFILE/AddFriend';

export default function ProfileScreen() {

    const [user, setUser] = useContext(AuthContext);

    return (
        <ScrollView>
            <View style={styles.container}>
                <UserProfile user={user} />
                <UserStats user={user} />
                <AddFriend user={user} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: Colors.white,
    },
})