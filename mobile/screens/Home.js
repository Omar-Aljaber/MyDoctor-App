import React, {useState ,useEffect} from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";


function HomeScreen(props) {
  const { navigation } = props

  const [token, setToken] = useState('');
  const _checkToken = async() => {
    const token = await AsyncStorage.getItem('token')
    setToken(token)
  }
  
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      _checkToken()
    });
    return unsubcribe;
  }, [navigation]);

  return (
    <React.Fragment>
        <ImageBackground style={styles.background} source={require('../assets/doc-bg.png')}>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to Application My Doctor</Text>
            <Text style={styles.text1}>The first Application for communication </Text>
            <Text style={styles.text2}>between the Doctor and the Patient</Text>
           
           {token ? (
             <React.Fragment>
               <Button 
                text="Show the Doctors"
                onPress={() => navigation.navigate('Doctors')}
               />
               <TouchableNativeFeedback
                onPress={() => navigation.navigate('Profile')}
               >
                 <Text  style={styles.labelButton}>Show the Profile</Text>
              </TouchableNativeFeedback>
             </React.Fragment>
           ) : (
            <React.Fragment>
              <Button
                style={styles.labelButton}
                text="SignIn"
                onPress={() => navigation.navigate('SignIn')}
              />
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('SignUp')}
               >
                 <Text style={styles.labelButton}>SignUp</Text>
               </TouchableNativeFeedback>
            </React.Fragment>
           )}
          </View>
        </ImageBackground>
    </React.Fragment>
  );
}

const textStyles = {
  color: '#fff',
  textAlign: 'center'
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  textContainer: {
    marginBottom: 30
  },
  title: {
    ...textStyles,
    fontSize: 30,
    paddingBottom: 35
  },
  text1: {
    ...textStyles,
    fontSize: 17
  },
  text2: {
    ...textStyles,
    fontSize: 17,
    paddingBottom: 35
  },
  labelButton: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  }
});

export default HomeScreen;
