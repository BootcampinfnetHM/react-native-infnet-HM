import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';

import { getData } from './utils/storage';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { IconButton } from '@react-native-material/core';
import { authLogout, reauthenticate } from './utils/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDTwF_SlTolKCtsfvJOGEgAvdj4ioJS-sI",
  authDomain: "pomodoro-63e9b.firebaseapp.com",
  projectId: "pomodoro-63e9b",
  storageBucket: "pomodoro-63e9b.appspot.com",
  messagingSenderId: "205726784104",
  appId: "1:205726784104:web:9c584470df1d7ced1479dd",
  measurementId: "G-MGLHLXXFME"
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const verifyLogin = async () => {
    const user =  await getData("user")
    
    if(user !== null) {
      

      setIsLoggedIn(true)
    }
  }

  useEffect(() => {
    initializeApp(firebaseConfig)
    verifyLogin()
    // reauthenticate()
  }, [])

 

  return (

      <NavigationContainer>
      {
      isLoggedIn ?
      (
      <Tab.Navigator
      screenOptions={ ({ route }) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon = ''  
          
          switch(route.name) {
            case 'Home':
            icon = 'home'
            break

            case 'Profile':
            icon = 'account'
            break
          }
          return <Icon name={icon} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'slateblue'  
      })}
      initialRouteName="Profile"
      >
        <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Pomodorium',
          headerRight: () => {
            return <IconButton
            onPress={() => {
              authLogout()
              setIsLoggedIn(false)
            }}
            icon={props => <Icon 
                            name='logout' 
                            {...props} />} 
                      
            /> 
          }
        }}
        
        />
        <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{
          firebaseApp,
          setIsLoggedIn
        }}
        options={{
          title: 'Perfil',
          headerRight: () => {
            return <IconButton
            onPress={() => {
              authLogout()
              setIsLoggedIn(false)
            }}
            icon={props => <Icon 
                            name='logout' 
                            {...props} />} 
                      
            /> 
          }
        }}
        
        />

      </Tab.Navigator> 
      )
      :
      (
      <Stack.Navigator>

        <Stack.Screen 
        name="Login" 
        component={Login}
        options={{
          headerShown: false
        }}
        initialParams={{
          firebaseApp,
          setIsLoggedIn
        }}
        />

        <Stack.Screen 
        name="Register" 
        component={Register}
        options={{
          headerShown: false
        }}
        initialParams={{
          firebaseApp,
          setIsLoggedIn
        }}
        />

        

      </Stack.Navigator> 
      )
      }
      </NavigationContainer>

  );
}

