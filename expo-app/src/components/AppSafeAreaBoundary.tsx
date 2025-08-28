import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const AppSafeAreaBoundary = ({
  children,
  classname = '',
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        className={`flex-1 ${classname}`}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export {AppSafeAreaBoundary};
