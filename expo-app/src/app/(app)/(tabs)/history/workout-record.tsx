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
import type {GetWorkoutQueryResult} from '@/types/sanity';

type Sets = GetWorkoutQueryResult[number]['exercises'][number]['sets'];
type ExerciseVolumeDisplayProps = {
  _sets: Sets;
  showKGs: boolean;
  convertToKG: (lbs: number) => number;
  convertToLBs: (kg: number) => number;
};

const ExerciseVolumeDisplay: React.FC<ExerciseVolumeDisplayProps> = ({
  _sets,
  showKGs,
  convertToKG,
  convertToLBs,
}) => {
  const calculateExerciseVolume = (sets: Sets) => {
    if (!sets?.length) return null;

    // Check if this is a duration-based exercise
    const isDurationBased = sets.some(
      set => set.setType === 'duration' && set.duration,
    );
    const hasWeight = sets.some(set => set.weight && set.weight > 0);

    if (isDurationBased) {
      // For duration-based exercises, show total time
      const totalDuration = sets.reduce((acc, set) => {
        return acc + (set.duration || 0);
      }, 0);

      if (hasWeight) {
        // Weighted duration exercise - show both time and weight
        const totalWeight = sets.reduce((acc, set) => {
          return acc + (set.weight || 0);
        }, 0);

        // Get the most common weight unit
        const weightUnits = sets
          .filter(set => set.weight && set.weight > 0)
          .map(set => set.weightUnit)
          .filter(Boolean);

        const mostCommonUnit =
          weightUnits.length > 0
            ? weightUnits.reduce((acc, unit) => {
                acc[unit] = (acc[unit] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            : null;

        const primaryUnit = mostCommonUnit
          ? Object.keys(mostCommonUnit).reduce((a, b) =>
              mostCommonUnit[a] > mostCommonUnit[b] ? a : b,
            )
          : 'kg';

        // Convert to user's preferred unit
        const displayWeight =
          primaryUnit === 'kg' && !showKGs
            ? convertToLBs(totalWeight)
            : primaryUnit === 'lbs' && showKGs
            ? convertToKG(totalWeight)
            : totalWeight;

        const displayUnit = showKGs ? 'kg' : 'lbs';

        return {
          type: 'weighted-duration',
          value: totalDuration,
          display: `${formatDuration(totalDuration)}`,
          subtitle: `${sets.length} set${
            sets.length > 1 ? 's' : ''
          } • ${displayWeight.toFixed(0)} ${displayUnit} total`,
        };
      } else {
        // Pure duration exercise
        return {
          type: 'duration',
          value: totalDuration,
          display: formatDuration(totalDuration),
          subtitle: `${sets.length} set${sets.length > 1 ? 's' : ''}`,
        };
      }
    } else {
      // For weight-based exercises, calculate volume
      if (hasWeight) {
        // Calculate total volume (weight × reps)
        const totalVolume = sets.reduce((acc, set) => {
          const weight = set.weight || 0;
          const reps = set.reps || 0;
          return acc + weight * reps;
        }, 0);

        // Get the most common weight unit
        const weightUnits = sets
          .filter(set => set.weight && set.weight > 0)
          .map(set => set.weightUnit)
          .filter(Boolean);

        const mostCommonUnit =
          weightUnits.length > 0
            ? weightUnits.reduce((acc, unit) => {
                acc[unit] = (acc[unit] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            : null;

        const primaryUnit = mostCommonUnit
          ? Object.keys(mostCommonUnit).reduce((a, b) =>
              mostCommonUnit[a] > mostCommonUnit[b] ? a : b,
            )
          : 'kg';

        // Convert to user's preferred unit
        const displayValue =
          primaryUnit === 'kg' && !showKGs
            ? convertToLBs(totalVolume)
            : primaryUnit === 'lbs' && showKGs
            ? convertToKG(totalVolume)
            : totalVolume;

        const displayUnit = showKGs ? 'kg' : 'lbs';

        return {
          type: 'weight',
          value: totalVolume,
          display: `${displayValue.toFixed(0)} ${displayUnit}`,
          subtitle: `${sets.length} set${
            sets.length > 1 ? 's' : ''
          } • ${sets.reduce(
            (acc, set) => acc + (set.reps || 0),
            0,
          )} total reps`,
        };
      } else {
        // Bodyweight exercise - show total reps
        const totalReps = sets.reduce((acc, set) => {
          return acc + (set.reps || 0);
        }, 0);

        return {
          type: 'bodyweight',
          value: totalReps,
          display: `${totalReps} reps`,
          subtitle: `${sets.length} set${sets.length > 1 ? 's' : ''}`,
        };
      }
    }
  };

  const volumeInfo = calculateExerciseVolume(_sets);
  if (!volumeInfo) return null;

  return (
    <View className="mt-4 pt-4 border-t border-gray-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-sm text-gray-600">
            {volumeInfo.type === 'duration'
              ? 'Total Time'
              : volumeInfo.type === 'weighted-duration'
              ? 'Total Time'
              : volumeInfo.type === 'weight'
              ? 'Exercise Volume'
              : 'Total Reps'}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            {volumeInfo.subtitle}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons
            name={
              volumeInfo.type === 'duration' ||
              volumeInfo.type === 'weighted-duration'
                ? 'time-outline'
                : volumeInfo.type === 'weight'
                ? 'barbell-outline'
                : 'body-outline'
            }
            size={16}
            color={APP_COLORS.lightGrayPrimary}
          />
          <Text className="text-sm font-medium text-gray-900 ml-2">
            {volumeInfo.display}
          </Text>
        </View>
      </View>
    </View>
  );
};

const WorkoutRecord = () => {
  const {workoutId} = useLocalSearchParams<{workoutId: string}>();
  const [showKGs, setShowKGs] = React.useState(true);
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
  const convertToKG = (lbs: number) => lbs * 0.453592;
  const convertToLBs = (kg: number) => kg * 2.20462;

  const getVolumeInfo = () => {
    // const sets = [];

    // workout.exercises.forEach(item => item.sets.forEach(set => sets.push(set)));
    const initialVol = {lbs: 0, kg: 0};

    const finalVol = workout.exercises.reduce((total, exercise) => {
      return exercise.sets.reduce((setsSum, _set) => {
        return {
          ...setsSum,
          [_set.weightUnit]: (setsSum[_set.weightUnit] || 0) + _set.weight,
        };
      }, total);
    }, initialVol);

    const weight = showKGs
      ? finalVol.kg + convertToKG(finalVol.lbs)
      : finalVol.lbs + convertToLBs(finalVol.kg);
    return weight.toFixed(0);
  };

  const getWeightString = (weight: number, unit: 'lbs' | 'kg') => {
    if (unit === 'kg' && showKGs) return weight + ' kg';
    else if (unit === 'kg' && !showKGs) {
      return convertToLBs(weight).toFixed(0) + ' lbs';
    } else if (unit === 'lbs' && showKGs) {
      return convertToKG(weight).toFixed(0) + ' kg';
    } else if (unit === 'lbs' && !showKGs) {
      return weight + ' lbs';
    }
  };

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
          <TouchableOpacity
            className="flex-row items-center"
            activeOpacity={0.8}
            onPress={() => setShowKGs(pre => !pre)}
          >
            <Ionicons
              name="barbell-outline"
              size={20}
              color={APP_COLORS.lightGrayPrimary}
            />
            <Text className="text-gray-700 ml-3 font-medium">
              {getVolumeInfo()} {showKGs ? 'kg' : 'lbs'} total volume
            </Text>
          </TouchableOpacity>
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
                        {set.setType === 'duration'
                          ? `duration`
                          : `${set.reps} reps`}
                      </Text>
                    </View>
                    {set?.weight && set.weight > 0 && (
                      <View className="flex-row items-center">
                        <Ionicons
                          name="barbell-outline"
                          size={16}
                          color={APP_COLORS.lightGrayPrimary}
                        />
                        <Text className="text-gray-700 ml-2 font-medium">
                          {getWeightString(set.weight, set.weightUnit)}
                        </Text>
                      </View>
                    )}
                    {(!set.weight || set.weight === 0) && !set.duration && (
                      <View className="flex-row items-center">
                        <Ionicons
                          name="body-outline"
                          size={16}
                          color={APP_COLORS.lightGrayPrimary}
                        />
                        <Text className="text-gray-700 ml-2 font-medium">
                          Body weight
                        </Text>
                      </View>
                    )}
                    {set.duration && (!set.weight || set.weight === 0) && (
                      <View className="flex-row items-center">
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={APP_COLORS.lightGrayPrimary}
                        />
                        <Text className="text-gray-700 ml-2 font-medium">
                          {formatDuration(set.duration)}
                        </Text>
                      </View>
                    )}
                    {set.duration && set.weight && set.weight > 0 && (
                      <View className="flex-row items-center">
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={APP_COLORS.lightGrayPrimary}
                        />
                        <Text className="text-gray-700 ml-2 font-medium">
                          {formatDuration(set.duration)}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
              {/* volume info */}
              <ExerciseVolumeDisplay
                _sets={_exercise.sets}
                showKGs={showKGs}
                convertToKG={convertToKG}
                convertToLBs={convertToLBs}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </AppSafeAreaBoundary>
  );
};

export default WorkoutRecord;
