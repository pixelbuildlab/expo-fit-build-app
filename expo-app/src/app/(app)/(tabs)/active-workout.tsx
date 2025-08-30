import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useRouter} from 'expo-router';
import {useWorkoutStore} from '@/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStopwatch} from 'react-timer-hook';
import {Ionicons} from '@expo/vector-icons';
import {ExerciseSelectionModal} from '@/components';

const ActiveWorkout = () => {
  const {top} = useSafeAreaInsets();
  const [showModal, setShowModal] = React.useState(false);
  const {minutes, seconds, reset} = useStopwatch({autoStart: true});
  const router = useRouter();

  const {workoutExercises, resetWorkout, weightUnit, setWeightUnit} =
    useWorkoutStore();
  // const [weightUnit, setWeightUnit] = React.useState<'lbs' | 'kg'>('kg');

  const handleEndWorkout = () => {
    Alert.alert('Cancel Workout', 'Are you sure you want to cancel workout?', [
      {text: 'No', style: 'cancel'},
      {
        text: 'End Workout',
        style: 'destructive',
        onPress: () => {
          resetWorkout();
          router.replace('/workout');
        },
      },
    ]);
  };

  useFocusEffect(
    React.useCallback(() => {
      // is no exercises in store then new workout
      if (workoutExercises.length === 0) {
        reset();
      }
    }, [reset, workoutExercises.length]),
  );

  const workoutDuration = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      <View className="bg-gray-800" style={{paddingTop: top}} />
      {/* header */}
      <View className="bg-gray-800 px-6 py-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white font-semibold text-xl">
              Active Workout
            </Text>
            <Text className="text-gray-300 mt-px">
              {/* duration func */}
              {workoutDuration}
            </Text>
          </View>
          <View className="flex-row items-center space-x-3 gap-2">
            <View className="flex-row bg-gray-700 rounded-lg p-1">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setWeightUnit('lbs')}
                className={`px-3 py-1 rounded ${
                  weightUnit === 'lbs' ? 'bg-blue-600' : ''
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    weightUnit === 'lbs' ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  lbs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setWeightUnit('kg')}
                className={`px-3 py-1 rounded ${
                  weightUnit === 'kg' ? 'bg-blue-600' : ''
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    weightUnit === 'kg' ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  kg
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleEndWorkout}
              activeOpacity={0.8}
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-medium">End Workout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-1 bg-white">
        <View className="px-6 mt-4">
          <Text className="text-gray-600 mb-2 text-center">
            {workoutExercises.length} exercises
          </Text>
        </View>
        {workoutExercises.length === 0 && (
          <View className="bg-gray-50 rounded-2xl items-center p-8 mx-6">
            <Ionicons name="barbell-outline" size={48} color="#9ca3af" />
            <Text className="text-gray-600 font-medium text-lg text-center mt-4">
              No exercises yet
            </Text>
            <Text className="text-gray-500 mt-2 text-center">
              Get started by adding your first exercise below
            </Text>
          </View>
        )}

        {/* exercises list */}
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView className="flex-1 px-6 mt-4">
            {workoutExercises.map(exercise => (
              <View key={exercise.id} className="mb-8">
                <Text>exercise</Text>
              </View>
            ))}
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
          </ScrollView>
        </KeyboardAvoidingView>

        {/* end list */}
      </View>
      <ExerciseSelectionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export default ActiveWorkout;
