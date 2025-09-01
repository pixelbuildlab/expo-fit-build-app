import React from 'react';
import {Text, View} from 'react-native';
import elevations from 'react-native-elevation';
import {AppLoader} from './AppLoader';
import {useUser} from '@clerk/clerk-expo';
import {useWorkoutHistory} from '@/hooks/sanity';
import {formatDuration} from '@/utils/time';

type WorkoutStatsCardProps = {title: string; showAverage?: boolean};

const WorkoutStatsCard = ({title, showAverage}: WorkoutStatsCardProps) => {
  const {workouts, isLoading} = useWorkoutHistory();
  const {user} = useUser();

  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce(
    (acc, workout) => acc + (workout.duration ?? 0),
    0,
  );
  const avgDuration =
    totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

  const userJoinDate = user.createdAt ?? new Date();

  const daysFromJoining = Math.floor(
    (new Date().getTime() - userJoinDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return (
    <View className="px-6 mb-6">
      <View
        className="bg-white rounded-xl p-6 border border-gray-100"
        style={{...elevations[2]}}
      >
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </Text>
        {/*  */}
        <View className="flex-row justify-between">
          {isLoading ? (
            <AppLoader indicatorProps={{size: 'small'}} />
          ) : (
            <>
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-blue-600">
                  {totalWorkouts}
                </Text>
                <Text className="text-sm text-gray-600 text-center">
                  Total{'\n'}Workouts
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-green-600">
                  {formatDuration(totalDuration)}
                </Text>
                <Text className="text-sm text-gray-600 text-center">
                  Total{'\n'}Time
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-purple-600">
                  {daysFromJoining}
                </Text>
                <Text className="text-sm text-gray-600 text-center">
                  Days{'\n'}Since Joining
                </Text>
              </View>
            </>
          )}
        </View>
        {/*  */}
        {showAverage && (
          <View className="mt-4 pt-4 border-t border-gray-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-600">Average workout duration</Text>
              <Text className="text-gray-900 font-semibold">
                {formatDuration(avgDuration)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export {WorkoutStatsCard};
