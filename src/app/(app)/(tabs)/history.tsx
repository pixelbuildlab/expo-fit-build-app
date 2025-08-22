import React from 'react';
import {Text} from 'react-native';
import {AppSafeAreaBoundary} from '@/components/AppSafeAreaBoundary';

export default function Page() {
  return (
    <AppSafeAreaBoundary>
      <Text>History</Text>
    </AppSafeAreaBoundary>
  );
}
