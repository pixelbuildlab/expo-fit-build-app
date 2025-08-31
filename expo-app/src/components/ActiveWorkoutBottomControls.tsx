import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {AppLoader} from './AppLoader';
import {useRouter} from 'expo-router';
import {useUser} from '@clerk/clerk-expo';
import {useTimerStore, useWorkoutStore} from '@/store';
import {useCreateWorkout, useExercises} from '@/hooks/sanity';
import type {WorkoutDocument} from '@/types/sanity/custom';

type ActiveWorkoutBottomControlsProps = {
  setShowModal: (state: boolean) => void;
  buttonDisableState: boolean;
};

export function ActiveWorkoutBottomControls({
  setShowModal,
  buttonDisableState,
}: ActiveWorkoutBottomControlsProps) {
  const router = useRouter();
  const {user} = useUser();
  const {resetWorkout, workoutExercises} = useWorkoutStore();
  const {exercises} = useExercises();
  const {timer} = useTimerStore();
  const {mutateAsync: createWorkout, isLoading} = useCreateWorkout();

  const endWorkout = async () => {
    try {
      // const b = 1;
      if (isLoading) {
        return;
      }
      const sanityRequestExercises = workoutExercises.map(exercise => {
        const sanityExerciseDetails = exercises.find(
          _exe => _exe._id === exercise.sanityId,
        );
        if (!sanityExerciseDetails) {
          throw new Error('Unable to find exercise details');
        }

        const exerciseSets = exercise.sets.filter(
          _set => _set.isCompleted && _set.reps && _set.weight,
        );

        const sanitySets = exerciseSets.map(sanitySet => ({
          _type: 'set',
          setType: 'reps',
          weight: +sanitySet.weight,
          reps: +sanitySet.reps,
          weightUnit: sanitySet.weightUnit,
          _key: Math.random().toString(36).substring(2, 9),
        }));

        const sanityExercises = {
          _type: 'exerciseSet',
          _key: Math.random().toString(36).substring(2, 9),
          exercise: {
            _ref: sanityExerciseDetails._id,
            _type: 'reference',
          },
          sets: sanitySets,
        };
        return sanityExercises;
      });

      const validSanityExercises = sanityRequestExercises.filter(
        exe => !!exe.sets.length,
      );

      const workoutDoc: WorkoutDocument = {
        _type: 'workout',
        userId: user.id,
        name: 'Workout' + user.id + new Date().toISOString(),
        description: 'Workout performed in app',
        exercises: validSanityExercises,
        duration: timer,
      };
      console.log(JSON.stringify(workoutDoc), null, 2);

      await createWorkout(workoutDoc);
      Alert.alert(
        'Workout Saved',
        'Your workout have been saved successfully!',
      );
      resetWorkout();
      router.replace('(app)/(tabs)/history?refresh=1');
    } catch (error) {
      console.log('Failed to save workout', error);
      Alert.alert('Save Failed', 'Failed to save workout. Please try again.');
    }
  };

  const saveWorkout = () => {
    Alert.alert(
      'Complete Workout',
      'Are you sure you want to complete the workout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Complete',
          onPress: async () => {
            await endWorkout();
          },
        },
      ],
    );
  };

  return (
    <>
      {/* additional bottom control area */}
      <View className="h-48" />
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        {/* add button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowModal(true)}
          className="bg-blue-600 rounded-2xl py-4 items-center mb-8 active:bg-blue-700"
        >
          <View className="flex-row items-center">
            <Ionicons size={20} name="add" className="mr-2" color="#fff" />
            <Text className="text-white font-semibold text-lg">
              Add Exercise
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={buttonDisableState}
          activeOpacity={0.8}
          onPress={() => saveWorkout()}
          className={`rounded-2xl py-4 items-center mb-8 ${
            buttonDisableState
              ? 'bg-gray-400'
              : 'bg-green-600 active:bg-green-700'
          }`}
        >
          {/* todo change this to correct value */}
          {isLoading ? (
            <AppLoader
              containerClasses="flex-row"
              indicatorProps={{size: 'small', color: '#fff'}}
              textClasses="text-white font-semibold text-lg ml-1"
              text="Saving..."
            />
          ) : (
            <Text className="text-white font-semibold text-lg">
              Complete Workout
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
