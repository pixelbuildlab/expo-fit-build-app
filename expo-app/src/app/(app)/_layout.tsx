import React from 'react';
import {Stack} from 'expo-router';
import {useAuth} from '@clerk/clerk-expo';
import {AppLoader} from '@/components';

const AppTabLayout = () => {
  const {isLoaded, isSignedIn} = useAuth();

  if (!isLoaded) {
    return <AppLoader />;
  }
  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen
          name="exercise-details"
          options={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: true,
            animationTypeForReplace: 'push',
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="sign-in" options={{headerShown: false}} />
        <Stack.Screen name="sign-up" options={{headerShown: false}} />
      </Stack.Protected>
    </Stack>
  );
};

export default AppTabLayout;
