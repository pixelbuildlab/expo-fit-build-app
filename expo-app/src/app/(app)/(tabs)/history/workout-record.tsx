import React from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {AppErrorScreen, AppLoader, AppSafeAreaBoundary} from '@/components';
import {useWorkoutByID} from '@/hooks/sanity';
import {Ionicons} from '@expo/vector-icons';
import {APP_COLORS} from '@/theme';
import {
  formatDuration,
  formatSingleWorkoutDate,
  formatSingleWorkoutTime,
} from '@/utils/time';
import {getWorkoutSets} from '@/utils/appUtils';
import Elevation from 'react-native-elevation';
import {useDeleteWorkout} from '@/hooks/sanity';

const WorkoutRecord = () => {
  const {workoutId} = useLocalSearchParams<{workoutId: string}>();
  const {workout, isLoading, isError, refetch} = useWorkoutByID(workoutId);
  const {mutateAsync: deleteWorkout, isLoading: isDeleteWorkoutLoading} =
    useDeleteWorkout(workoutId);
  const router = useRouter();

  const handleDeleteWorkout = () => {
    Alert.alert(
      'Delete Workout',
      'Are you sure you want to delete this workout? This action cannot be undone',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteWorkout();
            router.push('/(app)/(tabs)/history');
          },
        },
      ],
    );
  };

  if (isLoading) {
    return <AppLoader />;
  }

  if (!workout || isError) {
    return (
      <View className="flex-1">
        <AppErrorScreen onRetry={refetch} onGoBack={() => router.back()} />
      </View>
    );
  }

  return (
    <AppSafeAreaBoundary classname="bg-gray-50">
      <ScrollView className="flex-1">
        <View className="bg-white p-6 border-b border-gray-300">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">
              Workout Summary
            </Text>
            <TouchableOpacity
              className="bg-red-600 px-4 py-2 rounded-lg flex-row items-center"
              disabled={isDeleteWorkoutLoading}
              activeOpacity={0.8}
              onPress={handleDeleteWorkout}
            >
              {isDeleteWorkoutLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Ionicons name="trash-outline" size={16} color="#fff" />
                  <Text className="ml-2 font-medium text-white">Delete</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Summary date*/}

          <View className="flex-row items-center mb-3">
            <Ionicons
              name="calendar-outline"
              size={20}
              color={APP_COLORS.lightGrayPrimary}
            />
            <Text className="text-gray-700 ml-3 font-medium">
              {formatSingleWorkoutDate(workout._createdAt)} at{' '}
              {formatSingleWorkoutTime(workout._createdAt) ?? ''}
            </Text>
          </View>

          {/* info  minute */}

          <View className="flex-row items-center mb-3">
            <Ionicons
              name="time-outline"
              size={20}
              color={APP_COLORS.lightGrayPrimary}
            />
            <Text className="text-gray-700 ml-3 font-medium">
              {formatDuration(workout.duration)}
            </Text>
          </View>

          {/* info total exercise */}
          <View className="flex-row items-center mb-3">
            <Ionicons
              name="fitness"
              size={20}
              color={APP_COLORS.lightGrayPrimary}
            />
            <Text className="text-gray-700 ml-3 font-medium">
              {workout?.exercises?.length} exercise
              {workout?.exercises.length > 1 ? 's' : ''}
            </Text>
          </View>

          {/* info sets exercise */}
          <View className="flex-row items-center mb-3">
            <Ionicons
              name="bar-chart-outline"
              size={20}
              color={APP_COLORS.lightGrayPrimary}
            />

            <Text className="text-gray-700 ml-3 font-medium">
              {getWorkoutSets(workout)} total set
              {getWorkoutSets(workout) > 1 ? 's' : ''}
            </Text>
          </View>

          {/* info kgs exercise */}
          <View className="flex-row items-center">
            <Ionicons
              name="barbell-outline"
              size={20}
              color={APP_COLORS.lightGrayPrimary}
            />
            <Text className="text-gray-700 ml-3 font-medium">
              220 kg total volume
            </Text>
          </View>
        </View>

        {/* Exercise List 1 */}

        <View className="space-y-4 p-6 gap-4">
          {workout.exercises?.map((_exercise, index) => (
            <View
              key={_exercise.exercise._id}
              // className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              className="bg-white rounded-2xl p-6 border border-gray-100"
              style={{...Elevation[2]}}
            >
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">
                    {_exercise.exercise.name ?? '- -'}
                  </Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    {_exercise.sets?.length || 0} set
                    {_exercise.sets?.length > 1 ? 's' : ''} completed
                  </Text>
                </View>
                <View className="bg-blue-100 rounded-full w-10 h-10 items-center justify-center">
                  <Text className="text-blue-600 font-bold">{index + 1}</Text>
                </View>
              </View>

              {/* sets */}
              <View className="space-y-2">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Sets:
                </Text>
                {_exercise.sets.map((set, setIndex) => (
                  <View
                    className="bg-gray-50 rounded-lg p-3 flex-row items-center justify-between"
                    key={set._key}
                  >
                    <View className="flex-row items-center">
                      <View className="bg-gray-200 rounded-full w-6 h-6 mr-3 justify-center items-center">
                        <Text className="text-xs font-medium text-gray-700">
                          {setIndex + 1}
                        </Text>
                      </View>
                      <Text className="text-gray-900 font-medium">
                        {set.reps} reps
                      </Text>
                    </View>
                    {set?.weight && (
                      <View className="flex-row items-center">
                        <Ionicons
                          name="barbell-outline"
                          size={16}
                          color={APP_COLORS.lightGrayPrimary}
                        />
                        <Text className="text-gray-700 ml-2 font-medium">
                          {set.weight} {set.weightUnit ?? 'lbs'}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
              {/* volume info */}
            </View>
          ))}
        </View>
      </ScrollView>
      {/* <Text>
        WorkoutRecord {'\n'} {JSON.stringify(workout, null, 2)}
      </Text> */}
    </AppSafeAreaBoundary>
  );
};

export default WorkoutRecord;
