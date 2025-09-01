import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {
  AppSafeAreaBoundary,
  RefreshControlPreview,
  WorkoutStatsCard,
} from '@/components';
import {useUser} from '@clerk/clerk-expo';
import {useWorkoutHistory} from '@/hooks/sanity';
import {useRouter} from 'expo-router';
import {APP_COLORS} from '@/theme';
import elevations from 'react-native-elevation';
import {Ionicons} from '@expo/vector-icons';
import {formatDuration, workoutDateFormate} from '@/utils/time';
import {getWorkoutSets} from '@/utils/appUtils';

export default function HomePage() {
  const {isRefetching, refetch, workouts} = useWorkoutHistory();
  const {user} = useUser();
  const router = useRouter();
  const lastWorkout = workouts[0];

  return (
    <AppSafeAreaBoundary classname="bg-gray-50">
      <ScrollView
        refreshControl={
          <RefreshControlPreview
            refreshing={isRefetching}
            onRefresh={refetch}
            title="Pull down to refresh"
            titleColor={APP_COLORS.lightGrayPrimary}
            colors={[APP_COLORS.primaryBlue]}
            tintColor={APP_COLORS.primaryBlue}
          />
        }
      >
        <View className="px-6 pb-6 pt-8">
          <Text className="text-lg text-gray-600">Welcome back,</Text>
          <Text className="text-3xl font-bold text-gray-900">
            {user.firstName ?? 'Athlete'}! 💪
          </Text>
        </View>
        <WorkoutStatsCard title="Your stats" />
        <View className="px-6 mb-6">
          <Text className="font-semibold text-lg text-gray-900 mb-4">
            Quick Actions
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/workout')}
            className="bg-blue-600 rounded-2xl p-6 mb-4"
            style={{...elevations[2]}}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="h-12 w-12 rounded-full bg-blue-500 items-center justify-center mr-4">
                  <Ionicons size={24} color="#fff" name="play" />
                </View>
                <View>
                  <Text className="text-white font-semibold text-xl">
                    Start Workout
                  </Text>
                  <Text className="text-blue-100">
                    Begin your training session
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
          {/*  */}
          <View className="flex-row gap-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/history')}
              className="bg-white rounded-2xl p-4 flex-1 border border-gray-100"
              style={{...elevations[2]}}
            >
              <View className="items-center">
                <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-3">
                  <Ionicons
                    name="time-outline"
                    size={24}
                    color={APP_COLORS.lightGrayPrimary}
                  />
                </View>
                <Text className="text-gray-900 font-medium text-center">
                  Workout{'\n'}History
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/exercises')}
              className="bg-white rounded-2xl p-4 flex-1 border border-gray-100"
              style={{...elevations[2]}}
            >
              <View className="items-center">
                <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-3">
                  <Ionicons
                    name="barbell-outline"
                    size={24}
                    color={APP_COLORS.lightGrayPrimary}
                  />
                </View>
                <Text className="text-gray-900 font-medium text-center">
                  Browse{'\n'}Exercises
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/*  */}
        {lastWorkout && (
          <View className="px-6 mb-6">
            <Text className="font-semibold text-lg text-gray-900 mb-4">
              Last Workout
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-white rounded-2xl border border-gray-100 p-6"
              // key={workout._id}
              onPress={() => {
                router.push({
                  pathname: '/history/workout-record',
                  params: {workoutId: lastWorkout._id},
                });
              }}
              style={{...elevations[2]}}
            >
              <View className="flex-row items-center mb-4 justify-between">
                <View className="flex-1 gap-px">
                  <Text className="font-semibold text-lg text-gray-900">
                    {workoutDateFormate(lastWorkout._createdAt)}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Ionicons
                      name="time-outline"
                      color={APP_COLORS.lightGrayPrimary}
                    />
                    <Text className="text-gray-600 ml-2">
                      {formatDuration(lastWorkout.duration)}
                    </Text>
                  </View>
                </View>
                <View className="bg-blue-100 w-12 h-12 items-center justify-center rounded-full">
                  <Ionicons name="fitness-outline" color="#3b82f6" size={24} />
                </View>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-gray-600">
                  {lastWorkout.exercises.length ?? 0} exercises ·{' '}
                  {getWorkoutSets(lastWorkout)} set
                  {getWorkoutSets(lastWorkout) > 1 ? 's' : ''}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={APP_COLORS.lightGrayPrimary}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {!lastWorkout && (
          <View className="px-6 mb-8">
            <View
              className="bg-white rounded-2xl p-8 items-center border border-gray-100"
              style={{...elevations[2]}}
            >
              <View className="h-16 w-16 bg-blue-100 rounded-full justify-center items-center mb-4">
                <Ionicons
                  name="barbell-outline"
                  size={32}
                  color={APP_COLORS.primaryBlue}
                />
              </View>
              <Text className="text-xl font-semibold text-gray-900 mb-2">
                Ready to start your fitness journey?
              </Text>
              <Text className="text-gray-600 mb-4 text-center">
                Track your workout and see your progress over time
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push('/workout')}
                className="bg-blue-600 rounded-xl px-6 py-3"
              >
                <Text className="font-semibold text-white">
                  Start Your First Workout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </AppSafeAreaBoundary>
  );
}
