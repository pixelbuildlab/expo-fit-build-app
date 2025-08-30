import React from 'react';
import {Modal} from 'react-native';
import {AppSafeAreaBoundary} from './AppSafeAreaBoundary';
import {ExercisesScreen} from './screens/ExercisesScreen';
import {useWorkoutStore} from '@/store';
import {ExerciseQueryResult} from '@/types/sanity';

type ExerciseSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
};

const ExerciseSelectionModal = ({
  visible,
  onClose,
}: ExerciseSelectionModalProps) => {
  const {addExerciseToWorkout} = useWorkoutStore();

  const onExerciseClick = (exercise: ExerciseQueryResult[number]) => {
    addExerciseToWorkout({name: exercise.name, sanityId: exercise._id});
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      <AppSafeAreaBoundary>
        <ExercisesScreen
          title="Add Exercise"
          subtitle="Tap any exercise to add it to your workout"
          onCloseIcon={onClose}
          onExerciseClick={onExerciseClick}
        />
      </AppSafeAreaBoundary>
    </Modal>
  );
};

export {ExerciseSelectionModal};
