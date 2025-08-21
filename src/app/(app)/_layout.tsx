import {Slot, Stack} from 'expo-router';
import React from 'react';
import {Text, View} from 'react-native';

const AppTabLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
  );
};

export default AppTabLayout;
