import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {fetchWrapper} from '@/utils/fetchWrapper';

const deleteWorkout = async (workoutID: string | undefined) => {
  if (!workoutID) {
    throw new Error('App unable to access workout ID');
  }
  return await fetchWrapper({
    endpoint: 'workout/admin/' + workoutID,
    method: 'DELETE',
  });
};

export const useDeleteWorkout = (workoutID: string | undefined) => {
  const queryClient = useQueryClient();

  const isMutatingWorkout = useIsMutating({
    mutationKey: [QUERY_KEYS.deleteWorkout, workoutID],
  });

  const mutation = useMutation({
    mutationKey: [QUERY_KEYS.deleteWorkout, workoutID],
    mutationFn: () => deleteWorkout(workoutID),
    onError: error => {
      console.log('Failed to delete workout, ID:', workoutID, error);
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
