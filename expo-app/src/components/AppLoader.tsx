import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Text,
  View,
} from 'react-native';

const AppLoader = ({
  text = 'Loading...',
  textClasses = '',
  containerClasses = '',
  indicatorProps = {},
}: {
  text?: string;
  containerClasses?: string;
  textClasses?: string;
  indicatorProps?: ActivityIndicatorProps;
}) => {
  return (
    <View
      className={`flex-1 justify-center items-center gap-2 ${containerClasses}`}
    >
      <ActivityIndicator size="large" color="#0000ff" {...indicatorProps} />
      {text && (
        <Text className={`text-gray-500 text-center ml-2 ${textClasses}`}>
          {text}
        </Text>
      )}
    </View>
  );
};

export {AppLoader};
