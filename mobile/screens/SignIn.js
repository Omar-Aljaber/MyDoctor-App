import React, {useState, useEffect} from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGNIN_URL } from '../config/urls'
import axios from '../config/axios'; 
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import style from './styles/authStyles';

function SignInScreen(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({message: null, type: ''});


    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({message: null})
        }, 3000)
        
        return () => clearTimeout(timer)
    }, [alert.message]);

    const changeEmailHandler = (value) => {
        setEmail(value)
    };
    const changePasswordHandler = (value) => {
        setPassword(value)
    };

    const validate = () => {
        let validationErrors = []
        let passed = true
        if(!email){
            validationErrors.push("Please type your Email!")
            passed = false
        }
        if(!password){
            validationErrors.push("Please type your Password!")
            passed = false
        }
        
        if(validationErrors.length > 0){
            setAlert({message: validationErrors, type: 'danger'})
        }
        return passed
    }

    const _signIn = () => {
        (async() => {
            if(!validate()) return
            setLoading(true)
            try {
                const response = axios.post(SIGNIN_URL, {email, password});
                setLoading(false);
                setEmail('');
                setPassword('');
                AsyncStorage.setItem('token', (await response).data.token)
                props.navigation.navigate('Home')
            } catch(err) {
                setAlert({message: err.response.data.message, type: 'danger'})
                setLoading(false)
            }
        })();
    };

    return (
        <ScrollView contentContainerStyle={{paddingVertical: 40}} >
            <View style={style.container}>
                <Loader title="Creating a Account..." loading={isLoading} />
                <Alert messages={alert.message} type={alert.type}/>
                <ScreenTitle title="Sign in" icon="md-log-in" />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input 
                        placeholder="Email..."
                        value={email}
                        onChangeText={changeEmailHandler}
                    />
                    <Input 
                        placeholder="Pasword..."
                        value={password}
                        onChangeText={changePasswordHandler}
                        secureTextEntry 
                    />
                    <Button text="SignIn" onPress={_signIn} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )

}

export default SignInScreen;
