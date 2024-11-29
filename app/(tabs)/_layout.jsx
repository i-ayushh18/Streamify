import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from '../../constants'; // Import icons, assuming you're using them
import Home from '../screens/Home'; // Adjust path to your Home screen
import Bookmark from '../screens/Bookmark'; // Adjust path to your Bookmark screen
import Create from '../screens/Create'; // Adjust path to your Create screen
import Profile from '../screens/Profile'; // Adjust path to your Profile screen

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24, tintColor: color }}
      />
      <Text style={{ color, fontWeight: focused ? '600' : '400' }}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff' }, // Style the bottom tab bar
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
          ),
          headerShown: false, // Hide header for this screen
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.create} color={color} name="Create" focused={focused} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsLayout;
