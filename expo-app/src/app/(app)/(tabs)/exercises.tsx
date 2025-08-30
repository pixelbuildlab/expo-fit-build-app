import React from 'react';
import {useRouter} from 'expo-router';
import {AppSafeAreaBoundary, ExercisesScreen} from '@/components';
import type {ExerciseQueryResult} from '@/types/sanity';

const Exercises = () => {
  const router = useRouter();

  const onCardClick = (exercise: ExerciseQueryResult[number]) =>
    router.push(`/exercise-details?id=${exercise._id}`);

  return (
    <AppSafeAreaBoundary classname="bg-gray-50">
      <ExercisesScreen
        onExerciseClick={onCardClick}
        title="Exercise Library"
        subtitle="Discover and master new exercises"
      />
    </AppSafeAreaBoundary>
  );
};

export default Exercises;
