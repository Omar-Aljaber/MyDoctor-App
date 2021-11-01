import React, {useState, useEffect} from 'react';
import { ScrollView, KeyboardAvoidingView, CheckBox, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { SIGNUP_URL } from '../config/urls'
import axios from '../config/axios'; 
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import style from './styles/authStyles';


function SignUpScreen(props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        specialization: '',
        workingHours: '',
        phone: '',
        userType: false,
    })
    const [location, setLocation] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [alert, setAlert] = useState({message: null, type: ''})

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({message: null})
        }, 3000)
        
        return () => clearTimeout(timer)
    }, [alert.message])

    useEffect(() => {
        (async() => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if(status !== 'granted'){
                return;
            };
            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        })();
    }, []);

    const validate = () => {
        const { name, email, password, address, specialization, workingHours, phone, userType } = formData
        let validationErrors = []
        let passed = true
        if(!name){
            validationErrors.push("Please type your Name!")
            passed = false
        }
        if(!email){
            validationErrors.push("Please type your Email!")
            passed = false
        }
        if(!password){
            validationErrors.push("Please type your Password!")
            passed = false
        }
        if(userType){
            if(!specialization){
                validationErrors.push("Please type your Specialization!")
                passed = false
            }
            if(!address){
                validationErrors.push("Please type your Address!")
                passed = false
            }
            if(!workingHours){
                validationErrors.push("Please type your WorkingHours!")
                passed = false
            }
            if(!phone){
                validationErrors.push("Please type your Phone!")
                passed = false
            }
        }
        if(validationErrors.length > 0){
            setAlert({message: validationErrors, type: 'danger'})
        }
        return passed
    }

    const changeFormValue = (key, value) => {
        setFormData({...formData, [key]: value})
    }

    const _signUp = () => {
        if(!validate()) return
        (async () => {
            setLoading(true)
            const { name, email, password, address, specialization, workingHours, phone, userType } = formData
            const body = {
                name,
                email,
                password,
                userType: userType ? 'doctor' : 'normal',
                address,
                specialization,
                workingHours,
                phone,
                location: {
                    latitude: location ? location.coords.latitude : null,
                    longetude: location ? location.coords.longitude : null
                }
            }
            try{
                const response = await axios.post(SIGNUP_URL, body);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    address: '',
                    specialization: '',
                    workingHours: '',
                    phone: '',
                    location: null,
                    userType: false,
                })
                setLoading(false)
                props.navigation.navigate('SignIn')
            }catch(err){
                setAlert({message: err.response.data.message, type: 'danger'})
                setLoading(false)
            }
        })()
    }

    const { name, email, password, address, specialization, workingHours, phone, userType } = formData

    return (
        <ScrollView contentContainerStyle={{paddingVertical: 40}} >
            <Loader title="Creating a Account..." loading={isLoading} />
            <Alert messages={alert.message} type={alert.type} />
            <View style={style.container}>
                <ScreenTitle title="Create a new Account" icon="md-person-add" />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input 
                        placeholder="Name..."
                        value={name}
                        onChangeText={(text) => changeFormValue('name', text)}
                    />
                    <Input 
                        placeholder="Email..."
                        value={email}
                        onChangeText={(text) => changeFormValue('email', text)}
                    />
                    <Input 
                        secureTextEntry 
                        placeholder="Pasword..."
                        value={password}
                        onChangeText={(text) => changeFormValue('password', text)}
                    />
                    <View style={style.checkboxContainer}>
                        <CheckBox 
                            style={style.checkbox} 
                            value={userType}
                            onChange={() => changeFormValue('userType', !userType)}
                        />
                        <Text style={style.checkboxLabel}>Doctor</Text>
                    </View>
                    {userType && (
                        <React.Fragment>
                            <Input 
                                placeholder="Specialization..."
                                value={specialization}
                                onChangeText={(text) => changeFormValue('specialization', text)}
                            />
                            <Input 
                                placeholder="Working hours..."
                                value={workingHours}
                                onChangeText={(text) => changeFormValue('workingHours', text)}
                            />
                            <Input 
                                placeholder="Address..."
                                value={address}
                                onChangeText={(text) => changeFormValue('address', text)}
                            />
                            <Input 
                                placeholder="Phone..."
                                value={phone}
                                onChangeText={(text) => changeFormValue('phone', text)}
                            />
                        </React.Fragment>
                    )}
                    <Button text="Create" onPress={_signUp} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}

export default SignUpScreen;
