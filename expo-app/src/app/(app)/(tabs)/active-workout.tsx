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
import {Ionicons} from '@expo/vector-icons';
import elevations from 'react-native-elevation';
import {
  ActiveWorkoutBottomControls,
  AppWorkoutTimer,
  ExerciseSelectionModal,
  ExerciseSetCard,
} from '@/components';
import {useRouter} from 'expo-router';
import {useWorkoutStore} from '@/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ActiveWorkout = () => {
  const {top} = useSafeAreaInsets();
  const [showModal, setShowModal] = React.useState(false);
  const router = useRouter();
  const {
    workoutExercises,
    resetWorkout,
    weightUnit,
    setWeightUnit,
    deleteWorkoutExercise,
    addSetToExercise,
  } = useWorkoutStore();
  console.log('main workout');

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

  const buttonDisableState =
    !workoutExercises.length ||
    workoutExercises?.some(exercise =>
      exercise.sets.some(set => !set.isCompleted),
    );

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
            <AppWorkoutTimer />
            {/* <Text className="text-gray-300 mt-px">
           workout here {variable}
            </Text> */}
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
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="bg-blue-50 rounded-2xl p-4 mb-3"
                  onPress={() =>
                    router.push({
                      pathname: '/exercise-details',
                      params: {id: exercise.sanityId},
                    })
                  }
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-gray-900 mb-2">
                        {exercise.name ?? '- -'}
                      </Text>
                      <Text className="text-gray-600">
                        {exercise.sets.length} sets ·{' '}
                        {exercise.sets.filter(set => set.isCompleted).length}{' '}
                        completed
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteWorkoutExercise(exercise.id)}
                      className="bg-red-500 h-10 w-10 rounded-xl items-center justify-center ml-3"
                      activeOpacity={0.8}
                    >
                      <Ionicons name="trash" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                {/* sets */}
                <View
                  className="bg-white rounded-2xl p-4 border border-gray-100 mb-3"
                  style={{...elevations[2]}}
                >
                  <Text className="text-lg font-semibold text-gray-900 mb-3">
                    Sets:
                  </Text>
                  {!exercise.sets?.length ? (
                    <Text className="text-gray-500 text-center py-4">
                      No sets yet. Add your first set below.
                    </Text>
                  ) : (
                    exercise.sets.map((set, setIndex) => (
                      <ExerciseSetCard
                        set={set}
                        setIndex={setIndex}
                        key={set.id}
                        exerciseId={exercise.id}
                      />
                    ))
                  )}
                  {/* add new set button */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => addSetToExercise(exercise.id)}
                    className="bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg py-3 items-center mt-2"
                  >
                    <View className="flex-row items-center">
                      <Ionicons
                        color="#3b82f6"
                        size={16}
                        name="add"
                        className="mr-[6px]"
                      />
                      <Text className="text-blue-600 font-medium">Add Set</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {/* add button */}
            {/* controls move to fix bottom if relocated put here and remove additional view */}
          </ScrollView>
        </KeyboardAvoidingView>

        <ActiveWorkoutBottomControls
          setShowModal={setShowModal}
          buttonDisableState={buttonDisableState}
        />

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
