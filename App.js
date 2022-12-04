import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useState } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
      >
        <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Pomodorium'
        }}
        />
        <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil'
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
        />

        <Stack.Screen 
        name="Register" 
        component={Register}
        options={{
          headerShown: false
        }}
        />

        

      </Stack.Navigator> 
      )
      }
      </NavigationContainer>

  );
}

