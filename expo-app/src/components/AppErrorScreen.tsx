import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {APP_COLORS} from '@/theme';

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  onGoBack?: () => void;
  goBackLabel?: string;
};

export function AppErrorScreen({
  title = 'Something went wrong',
  message = "We couldn't load the data. Please try again later.",
  onRetry,
  retryLabel = 'Try again',
  onGoBack,
  goBackLabel = 'Go back',
}: Props) {
  return (
    <View className="flex-1 bg-white justify-center items-center px-8">
      {/* Error Icon */}
      <View className="items-center mb-8">
        <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-6">
          <Ionicons name="alert-circle" size={40} color="#ef4444" />
        </View>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
        {title}
      </Text>

      {/* Message */}
      <Text className="text-gray-600 text-center text-base leading-6 mb-12 max-w-sm">
        {message}
      </Text>

      {/* Buttons Container */}
      <View className="w-full flex-row-reverse gap-3">
        {/* Retry Button */}
        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            activeOpacity={0.5}
            className="flex-1 rounded-xl py-4 px-6 shadow-sm"
            style={{backgroundColor: APP_COLORS.primaryBlue}}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="refresh" size={20} color="white" />
              <Text className="font-semibold text-lg text-white ml-2">
                {retryLabel}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Go Back Button */}
        {onGoBack && (
          <TouchableOpacity
            onPress={onGoBack}
            activeOpacity={0.5}
            className="flex-1 rounded-xl py-4 px-6 bg-gray-100 border border-gray-200"
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="arrow-back" size={20} color="#6b7280" />
              <Text className="font-medium text-base ml-2 text-gray-600">
                {goBackLabel}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
