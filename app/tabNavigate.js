import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AppHome from '../screens/AppHome'; // Your AppHome screen
import Create from '../screens/create'; // Your Create screen

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="AppHome"
      screenOptions={{
        headerShown: false, // Hide header for all tabs
        tabBarActiveTintColor: '#2e64e5', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        tabBarStyle: {
          height: 60, // Customize tab height
          backgroundColor: '#fff', // Tab background color
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0', // Border color
        },
      }}
    >
      <Tab.Screen
        name="AppHome"
        component={AppHome}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-circle-outline" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
