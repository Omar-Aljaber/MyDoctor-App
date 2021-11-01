import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROFILE_URL } from '../config/urls';
import axios from '../config/axios';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { transformName } from '../config/helpers';
import styles from './styles/profileStyles';

function ProfileScreen(props){
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        _getProfile()
    }, [])

    const _getProfile = () => {
        (async() => {
            setLoading(true)
            try {
                const token = await AsyncStorage.getItem('token');
                axios.defaults.headers.common.Authorization = `JWT ${token}`;
                const response = await axios.get(PROFILE_URL);
                setUser(response.data);
                setLoading(false);
            }catch(err){
                setLoading(false);
            }
        })();
    };

    signOut = () => {
        Alert.alert(
            '',
            'Are You sure?',
            [
                {
                    text: 'close',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await AsyncStorage.clear();
                        props.navigation.navigate('Home')
                    },
                },
            ],
            {cancelable: false}
        );
    };

    return (
        <View style={styles.container}>
            <Loader title="Geting the User Profile..." loading={isLoading} />
            {user && 
                <View>
                    <View style={styles.userMetaContainer}>
                        <View style={styles.userAvtar}>
                            <Text style={styles.userAvtarText}>{transformName(user.name)}</Text>
                        </View>
                        <View style={styles.userMeta}>
                            <Text>{user.name}</Text>
                            <Text>{user.email}</Text>
                        </View>
                    </View>
                    {user.profile && 
                        <View>
                            <View style={styles.doctorInfo}>
                                <View style={styles.infoCell}>
                                    <Text style={styles.infoTitle}>Specialization</Text>
                                    <Text style={styles.infoText}>{user.profile.specialization}</Text>
                                </View>
                                <View style={styles.infoCell}>
                                    <Text style={styles.infoTitle}>Address</Text>
                                    <Text style={styles.infoText}>{user.profile.address}</Text>
                                </View>
                                <View style={styles.infoCell}>
                                    <Text style={styles.infoTitle}>Working Hours</Text>
                                    <Text style={styles.infoText}>{user.profile.workingHours}</Text>
                                </View>
                                <View style={styles.infoCell}>
                                    <Text style={styles.infoTitle}>Phone</Text>
                                    <Text style={styles.infoText}>{user.profile.phone}</Text>
                                </View>
                            </View>
                        </View>
                    }
                    <Button 
                        buttonStyles={styles.logoutButton}
                        textStyles={styles.buttonText}
                        text="Logout"
                        onPress={signOut}
                    />
                </View>
            }
        </View>
    )

}

export default ProfileScreen;
