import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const AppSafeAreaBoundary = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export {AppSafeAreaBoundary};
