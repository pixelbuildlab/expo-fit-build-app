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
    // temporary
    <Tabs initialRouteName="history">
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
          // tabBarIcon:
          // ({color, size}) => (
          //   <AntDesign name="book" color={color} size={size} />
          // ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          headerShown: false,
          title: 'Workout',
          tabBarIcon: RenderIcon({name: 'pluscircle'}),

          // tabBarIcon: ({color, size}) => (
          //   <AntDesign name="pluscircle" color={color} size={size} />
          // ),
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

          // tabBarIcon: ({color, size}) => (
          //   <AntDesign name="clockcircleo" color={color} size={size} />
          // ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: RenderIcon({name: 'user'}),

          // tabBarIcon: ({color, size}) => (
          //   //  <Image style={{width:28, height:28, borderRadius:100}} className='rounded-full' source={user?.imageUrl?? user?.externalAccounts[0]?.imageUrls}/>
          //   <></>
          // ),
        }}
      />
    </Tabs>
  );
};

export default AppTabLayout;
