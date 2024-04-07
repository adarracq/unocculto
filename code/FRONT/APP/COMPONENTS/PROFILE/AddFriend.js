import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../SHARED/Colors'
import { friendService } from '../../SERVICES/friend.service';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function AddFriend({ user }) {

    const [friends, setFriends] = useState([]);
    const [inputName, onChangeInputName] = useState('');
    const [inputError, setInputError] = useState(null);

    const getFriends = () => {
        friendService.getByUsername(user.username)
            .then(friends => {
                setFriends(friends);
            });
    }

    const addFriend = () => {
        if (!inputName) {
            setInputError("Veuillez entrer un nom d'utilisateur");
            return;
        }

        let json = {
            username1: user.username,
            username2: inputName,
            status: 'pending'
        }
        friendService.create(json)
            .then(answer => {
                switch (answer) {
                    case 0:
                        setInputError(null);
                        onChangeInputName('');
                        getFriends();
                        break;
                    case 1:
                        setInputError("Vous êtes déjà amis");
                        break;
                    case 2:
                        setInputError("Entrez un nom d'utilisateur différent du votre");
                        break;
                    case 3:
                        setInputError("Demande déjà envoyée");
                        break;
                    case 4:
                        setInputError("L'utilisateur n'existe pas");
                        break;
                    default:
                        setInputError("Erreur inconnue");
                        break;
                }
            });
    }

    const accept = (username) => {
        let json = {
            username1: user.username,
            username2: username
        }
        friendService.accept(json)
            .then(answer => {
                getFriends();
            });
    }

    const refuse = (username) => {
        let json = {
            username1: user.username,
            username2: username
        }
        friendService.refuse(json)
            .then(answer => {
                getFriends();
            });
    }

    useEffect(() => {
        getFriends();

    }, []);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Ajouter un ami</Text>
                <View style={styles.separator} />
                <View style={styles.lineContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeInputName}
                        value={inputName}
                        placeholder="Nom d'utilisateur"
                        placeholderTextColor={Colors.lightGray2}
                    />
                    <TouchableOpacity
                        onPress={addFriend}
                        style={styles.addBtn} >
                        <Text style={styles.addText}>Ajouter</Text>
                    </TouchableOpacity>
                </View>

                {
                    inputError &&
                    <Text style={{ color: Colors.red }}>{inputError}</Text>
                }

            </View>

            {
                friends.some(f => f.status === 'friends') &&
                <View style={styles.container}>
                    <Text style={styles.title}>Amis</Text>
                    <View style={styles.separator} />
                    {
                        friends.map((f, index) => {
                            if (f.status === 'friends') {
                                return (
                                    <View key={index} style={styles.lineContainer}>
                                        <Text style={styles.username}>{
                                            f.username1 === user.username ? f.username2 : f.username1
                                        }</Text>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            }
            {
                friends.some(f => f.status == 'pending' && f.username2 == user.username) &&
                <View style={styles.container}>
                    <Text style={styles.title}>A valider</Text>
                    <View style={styles.separator} />
                    {
                        friends.map((f, index) => {
                            if (f.status == 'pending' && f.username2 == user.username) {
                                return (
                                    <View key={index} style={styles.lineContainer}>
                                        <Text style={styles.username}>{f.username1}</Text>
                                        <TouchableOpacity
                                            onPress={() => accept(f.username1)}>
                                            <AntDesign name="checksquare" size={24} color={Colors.lightGreen} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => refuse(f.username1)}>
                                            <AntDesign name="closesquare" size={24} color={Colors.lightRed} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            }
            {
                friends.some(f => f.status == 'pending' && f.username1 == user.username) &&
                <View style={styles.container}>
                    <Text style={styles.title}>En attente</Text>
                    <View style={styles.separator} />
                    {
                        friends.map((f, index) => {
                            if (f.status == 'pending' && f.username1 == user.username) {
                                return (
                                    <View key={index} style={styles.lineContainer}>
                                        <Text style={styles.username}>{f.username2}</Text>
                                        <AntDesign name="clockcircle" size={24} color={Colors.lightBlue} />
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.darkGrey,
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        margin: 8,
        flex: 1,
        gap: 20
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        gap: 10,
        flex: 1,
    },
    separator: {
        borderBottomColor: Colors.lightGray2,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
        textAlign: 'center',
    },
    username: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.white,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.lightGray2,
        color: Colors.white,
        padding: 10,
        borderRadius: 5,
    },
    addBtn: {
        backgroundColor: Colors.white,
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addText: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.darkGrey,
    },
})