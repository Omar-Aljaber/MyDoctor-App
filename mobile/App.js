import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './screens/Home';
import DoctorsScreen from './screens/Doctors'
import SignUpScreen from './screens/SignUp'
import SignInScreen from './screens/SignIn';
import ProfileScreen from './screens/Profile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            textAlign: 'center',
          },
        }}
      >
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Doctors"
          component={DoctorsScreen}
        />
        <Stack.Screen 
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: 'New Account'
          }}
        />
        <Stack.Screen 
          name="SignIn"
          component={SignInScreen}
          options={{
            title: 'SignIn'
          }}
        />
        <Stack.Screen 
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Personal Profile'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
