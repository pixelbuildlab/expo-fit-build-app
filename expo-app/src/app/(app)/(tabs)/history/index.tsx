import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  AppLoader,
  AppSafeAreaBoundary,
  RefreshControlPreview,
} from '@/components';
import {Ionicons} from '@expo/vector-icons';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {APP_COLORS} from '@/theme';
import {formatDuration, workoutDateFormate} from '@/utils/time';
import {useWorkoutHistory} from '@/hooks/sanity';
import type {GetWorkoutQueryResult} from '@/types/sanity';

export default function HistoryPage() {
  const {workouts, isLoading, refetch, isRefetching} = useWorkoutHistory();

  const {refresh} = useLocalSearchParams<{refresh: string}>();

  console.log(refresh, 'todo implement');

  const router = useRouter();
  // React.useEffect(() => {
  //   if (refresh === '1') {
  //     refetch();
  //     router.replace('/(app)/(tabs)/history');
  //   }
  // }, [refetch, refresh, router]);

  // const onRefresh = async () => {
  //   await refetch();
  // };

  const getExerciseNames = React.useCallback(
    (workout: GetWorkoutQueryResult[number]) =>
      workout.exercises?.map(_exercise => _exercise.exercise.name),
    [],
  );

  const getWorkoutSets = React.useCallback(
    (workout: GetWorkoutQueryResult[number]) =>
      workout.exercises?.reduce((sum, item) => {
        return sum + (item.sets?.length || 0);
      }, 0),
    [],
  );

  if (isLoading) {
    return (
      <AppSafeAreaBoundary classname="bg-gray-50">
        <View className="px-6 py-4 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">
            Workout History
          </Text>
        </View>
        <AppLoader text="Loading your workouts..." textClasses="mt-4" />
      </AppSafeAreaBoundary>
    );
  }

  return (
    <AppSafeAreaBoundary>
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Workout History
        </Text>
        <Text className="text-gray-600 mt-1">
          {workouts.length} workout{workouts.length > 1 ? 's' : ''} completed
        </Text>
      </View>
      <ScrollView
        contentContainerClassName="p-6"
        className="flex-1"
        refreshControl={
          <RefreshControlPreview
            refreshing={isRefetching}
            onRefresh={refetch}
            title="Pull down to refresh workouts"
            titleColor={APP_COLORS.lightGrayPrimary}
            colors={[APP_COLORS.primaryBlue]}
            tintColor={APP_COLORS.primaryBlue}
          />
        }
      >
        {workouts.length ? (
          <View className="space-y-4 gap-4">
            {workouts.map(workout => (
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                key={workout._id}
                onPress={() => {
                  router.push({
                    pathname: '/history/workout-record',
                    params: {workoutId: workout._id},
                  });
                }}
              >
                <View className="flex-row items-center mb-4 justify-between">
                  <View className="flex-1 gap-px">
                    <Text className="font-semibold text-lg text-gray-900">
                      {workoutDateFormate(workout._createdAt)}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Ionicons
                        name="time-outline"
                        color={APP_COLORS.lightGrayPrimary}
                      />
                      <Text className="text-gray-600 ml-2">
                        {formatDuration(workout.duration)}
                      </Text>
                    </View>
                  </View>
                  <View className="bg-blue-100 w-12 h-12 items-center justify-center rounded-full">
                    <Ionicons
                      name="fitness-outline"
                      color="#3b82f6"
                      size={24}
                    />
                  </View>
                </View>

                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <View className="bg-gray-100 rounded-lg px-3 py-2 mr-3">
                      <Text className="text-sm font-medium text-gray-700">
                        {workout.exercises.length || 0} exercise
                        {workout.exercises.length > 1 ? 's' : ''}
                      </Text>
                    </View>
                    <View className="bg-gray-100 rounded-lg px-3 py-2 mr-3">
                      <Text className="text-sm font-medium text-gray-700">
                        {getWorkoutSets(workout)} set
                        {getWorkoutSets(workout) > 1 ? 's' : ''}
                      </Text>
                    </View>
                  </View>
                </View>

                {workout.exercises && workout.exercises.length && (
                  <View>
                    <Text className="text-sm font-medium to-gray-700 mb-2">
                      Exercises:
                    </Text>

                    <View className="flex-row flex-wrap">
                      {getExerciseNames(workout)
                        .slice(0, 3)
                        .map((name, index) => (
                          <View
                            key={index}
                            className="bg-blue-50 rounded-lg px-3 py-1 mb-2 mr-2"
                          >
                            <Text className="text-blue-700 text-sm font-medium">
                              {name}
                            </Text>
                          </View>
                        ))}
                      {getExerciseNames(workout).length > 3 && (
                        <View className="bg-gray-100 rounded-lg px-3 py-1 mb-2 mr-2">
                          <Text className="text-gray-600 text-sm font-medium">
                            +{getExerciseNames(workout).length - 3} more
                          </Text>
                        </View>
                      )}
                    </View>

                    {/*  */}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="bg-white rounded-2xl p-8 items-center">
            <Ionicons name="barbell-outline" size={64} color="#9ca3af" />
            <Text className="text-xl font-semibold text-gray-900 mt-4">
              No workouts yet
            </Text>
            <Text className="text-gray-600 mt-2 text-center">
              Your completed workouts will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </AppSafeAreaBoundary>
  );
}
