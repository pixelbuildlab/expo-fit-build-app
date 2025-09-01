import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {fetchWrapper} from '@/utils/fetchWrapper';
import type {ExerciseQueryResult} from '@/types/sanity';

type ResponseData = {data: ExerciseQueryResult[number]; success: boolean};

const getExerciseByID = async (exerciseID: string) => {
  return await fetchWrapper<ResponseData>({
    endpoint: 'exercises/' + exerciseID,
  });
};

export const useExercisesByID = (exerciseID: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.exercise, exerciseID],
    queryFn: () => getExerciseByID(exerciseID),
    enabled: !!exerciseID,
  });

  if (query.error) {
    console.log('Failed to get exercise for ID:', exerciseID, query.error);
  }

  return {
    exercise: query.data?.data,
    ...query,
  };
};
