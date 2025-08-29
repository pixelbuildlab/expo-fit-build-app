import React from 'react';
import {Stack} from 'expo-router';

const HistoryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen
        name="workout-record"
        options={{
          headerShown: true,
          headerBackTitle: 'History',
          headerTitle: 'Workout Record',
        }}
      />
    </Stack>
  );
};

export default HistoryLayout;
