import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {adminClient} from '@/lib/sanity';
import {QUERY_KEYS} from '@/constants/queryKeys';
import type {WorkoutDocument} from '@/types/sanity/custom';

const createWorkout = async (workoutData: WorkoutDocument) => {
  return await adminClient.create(workoutData);
};

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();

  const isMutatingWorkout = useIsMutating({
    mutationKey: [QUERY_KEYS.createWorkout],
  });

  const mutation = useMutation({
    mutationKey: [QUERY_KEYS.createWorkout],
    mutationFn: (workoutData: WorkoutDocument) => createWorkout(workoutData),
    onError: error => {
      console.log('Failed to create workout:', error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.workoutHistory],
      });
    },
  });

  return {
    isLoading: !!isMutatingWorkout,
    ...mutation,
  };
};
