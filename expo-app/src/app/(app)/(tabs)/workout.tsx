import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AppSafeAreaBoundary} from '@/components';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {APP_COLORS} from '@/theme';
import elevations from 'react-native-elevation';

const Workout = () => {
  const router = useRouter();

  const navigate = () => {
    router.push('/active-workout');
  };

  return (
    <AppSafeAreaBoundary classname="bg-gray-50">
      <View className="flex-1 px-6">
        <View className="pt-8 pb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Ready to Train?
          </Text>
          <Text className="text-lg text-gray-600">
            Start your workout session
          </Text>
        </View>
      </View>
      <View
        className="bg-white rounded-3xl p-6 border border-gray-100 mx-6 mb-8"
        style={{...elevations[2]}}
      >
        <View className="flex-row justify-between mb-6 items-center">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Ionicons
                name="fitness"
                size={24}
                color={APP_COLORS.primaryBlue}
              />
            </View>
            <View>
              <Text className="text-xl font-semibold text-gray-900">
                Start Workout
              </Text>
              <Text className="text-gray-500">Begin your training session</Text>
            </View>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="font-medium text-sm text-green-700">Ready</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={navigate}
          className="bg-blue-600 items-center rounded-2xl py-4 active:bg-blue-700"
        >
          <View className="flex-row items-center">
            <Ionicons name="play" color="#fff" size={20} className="mr-2" />
            <Text className="text-white font-semibold text-lg">
              Start Workout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </AppSafeAreaBoundary>
  );
};

export default Workout;
