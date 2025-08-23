import React from 'react';
import {Text, View} from 'react-native';

const AuthScreenDivider = () => {
  return (
    <View className="flex-row my-4 items-center">
      <View className="flex-1 h-px bg-gray-200" />
      <Text className="px-4 text-sm text-gray-500">or</Text>
      <View className="flex-1 h-px bg-gray-200" />
    </View>
  );
};

export default AuthScreenDivider;
