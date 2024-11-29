import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import Bottom Tab Navigator
import { Ionicons } from '@expo/vector-icons'; // For tab icons
import AppHome from '../screens/AppHome';
import create from '../screens/create';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import GlobalProvider from '../context/GlobalProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator with only AppHome and Create
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name="AppHome"
        component={AppHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={create}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const HomeStack = () => {
  return (
    <GlobalProvider>
      <Stack.Navigator>
      <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
      
      <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
          
        />
      
      
      
        {/* Tab Navigator for AppHome and Create */}
        
        {/* Other Screens */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="AppHome" component={AppHome} options={{ headerShown: false }}/>
        
        
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </GlobalProvider>
  );
};

export default HomeStack;
