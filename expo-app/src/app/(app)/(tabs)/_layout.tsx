import React from 'react';
import {Tabs} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
// import {Image} from 'react-native';

const RenderIcon =
  ({name}: {name: keyof typeof AntDesign.glyphMap}) =>
  ({color, size}: {color: string; size: number}) =>
    <AntDesign name={name} color={color} size={size} />;

const AppTabLayout = () => {
  return (
    // temporary untill new lib
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: RenderIcon({name: 'home'}),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          headerShown: false,
          title: 'Exercises',
          tabBarIcon: RenderIcon({name: 'book'}),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          headerShown: false,
          title: 'Workout',
          tabBarIcon: RenderIcon({name: 'pluscircle'}),
        }}
      />
      <Tabs.Screen
        name="active-workout"
        options={{
          headerShown: false,
          title: 'Active  Workout',
          href: null,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: 'History',
          tabBarIcon: RenderIcon({name: 'clockcircleo'}),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: RenderIcon({name: 'user'}),
        }}
      />
    </Tabs>
  );
};

export default AppTabLayout;
