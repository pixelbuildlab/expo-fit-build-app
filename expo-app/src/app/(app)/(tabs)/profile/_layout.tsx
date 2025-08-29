import React from 'react';
import {Stack} from 'expo-router';

function Layout() {
  return (
    <Stack>
      <Stack.Screen options={{headerShown: false}} name="index" />
    </Stack>
  );
}

export default Layout;
