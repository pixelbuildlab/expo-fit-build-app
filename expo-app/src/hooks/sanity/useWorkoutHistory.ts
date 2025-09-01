import {useQuery} from '@tanstack/react-query';
import {useUser} from '@clerk/clerk-expo';
import {fetchWrapper} from '@/utils/fetchWrapper';
import {QUERY_KEYS} from '@/constants/queryKeys';
import type {GetWorkoutQueryResult} from '@/types/sanity';

type ResponseData = {data: GetWorkoutQueryResult; success: boolean};

const getWorkoutHistory = async (userID: string) => {
  return await fetchWrapper<ResponseData>({
    endpoint: 'workout/history/' + userID,
  });
};

export const useWorkoutHistory = () => {
  const {user} = useUser();

  const query = useQuery({
    queryKey: [QUERY_KEYS.workoutHistory],
    queryFn: () => getWorkoutHistory(user.id),
  });

  if (query.error) {
    console.log('Failed to get workout history:', query.error);
  }

  return {
    workouts: query.data?.data ?? [],
    ...query,
  };
};
