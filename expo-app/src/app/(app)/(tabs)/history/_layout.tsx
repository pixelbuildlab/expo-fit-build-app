import React from 'react';
import {Stack} from 'expo-router';

const HistoryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="workout-record" />
    </Stack>
  );
};

export default HistoryLayout;
