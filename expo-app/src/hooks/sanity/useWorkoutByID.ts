import {useQuery} from '@tanstack/react-query';
import {fetchWrapper} from '@/utils/fetchWrapper';
import {QUERY_KEYS} from '@/constants/queryKeys';
import type {GetWorkoutQueryResult} from '@/types/sanity';

type ResponseData = {data: GetWorkoutQueryResult[number]; success: boolean};

const getWorkoutByID = async (workoutID: string) => {
  return await fetchWrapper<ResponseData>({
    endpoint: 'workout/' + workoutID,
  });
};

export const useWorkoutByID = (workoutID: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.workout, workoutID],
    queryFn: () => getWorkoutByID(workoutID),
  });

  if (query.error) {
    console.log('Failed to get workout for ID:', workoutID, query.error);
  }

  return {
    workout: query.data?.data,
    ...query,
  };
};
