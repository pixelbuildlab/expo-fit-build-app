import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useWorkoutStore} from '@/store';
import {Ionicons} from '@expo/vector-icons';
import {FormTextInput} from './form';
import {APP_COLORS} from '@/theme';
import type {Set} from '@/store/types';

export const ExerciseSetCard = ({
  set,
  setIndex,
  exerciseId,
}: {
  exerciseId: string;
  set: Set;
  setIndex: number;
}) => {
  const {updateExerciseSet, deleteExerciseSet} = useWorkoutStore();
  const {weightUnit} = useWorkoutStore();

  return (
    <>
      <View
        className={`py-3 px-3 mb-2 rounded-lg border ${
          set.isCompleted
            ? 'bg-green-100 border-green-300'
            : 'bg-gray-50 border-gray-200'
        }`}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-700 font-medium w-8">{setIndex + 1}</Text>
          {/* reps input */}
          <View className="flex-1 mx-2">
            <Text className="text-gray-500 text-xs mb-1">Reps</Text>
            <FormTextInput
              value={set.reps}
              placeholder="0"
              onChangeText={value =>
                updateExerciseSet(exerciseId, set.id, {
                  reps: value.replace(/[^0-9]/g, ''),
                })
              }
              keyboardType="numeric"
              className={`border rounded-lg px-3 py-2 text-center ${
                set.isCompleted
                  ? 'bg-gray-100 border-gray-300 text-gray-500'
                  : 'border-gray-300 bg-white'
              }`}
              editable={!set.isCompleted}
            />
          </View>

          <View className="flex-1 mx-2">
            <Text className="text-gray-500 text-xs mb-1">
              Weight ({weightUnit})
            </Text>
            <FormTextInput
              value={String(set.weight)}
              placeholder="0"
              onChangeText={value =>
                updateExerciseSet(exerciseId, set.id, {
                  weight: value.replace(/[^0-9]/g, ''),
                })
              }
              keyboardType="numeric"
              className={`border rounded-lg px-3 py-2 text-center ${
                set.isCompleted
                  ? 'bg-gray-100 border-gray-300 text-gray-500'
                  : 'border-gray-300 bg-white'
              }`}
              editable={!set.isCompleted}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              updateExerciseSet(exerciseId, set.id, {isCompleted: true})
            }
            className={`w-12 h-12 rounded-xl items-center justify-center mx-1 ${
              set.isCompleted ? 'bg-green-500' : 'bg-gray-200'
            }`}
          >
            <Ionicons
              size={20}
              name={set.isCompleted ? 'checkmark' : 'checkmark-outline'}
              color={set.isCompleted ? '#fff' : APP_COLORS.darkerGray}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => deleteExerciseSet(exerciseId, set.id)}
            className="w-12 h-12 rounded-xl items-center justify-center mx-1 bg-red-500"
          >
            <Ionicons size={18} name="trash" color="#fff" />
          </TouchableOpacity>
          {/* control buttons */}
        </View>
      </View>
    </>
  );
};
