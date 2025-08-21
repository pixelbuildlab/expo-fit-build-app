import React from 'react';
import {Text} from 'react-native';
import {AppSafeAreaBoundary} from '@/components';

export default function Page() {
  return (
    <AppSafeAreaBoundary>
      <Text>Profile</Text>
    </AppSafeAreaBoundary>
  );
}
