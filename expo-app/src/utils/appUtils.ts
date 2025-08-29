import type {GetWorkoutQueryResult} from '@/types/sanity';

export const getWorkoutSets = (_workout: GetWorkoutQueryResult[number]) =>
  _workout.exercises?.reduce((sum, item) => {
    return sum + (item.sets?.length || 0);
  }, 0);
