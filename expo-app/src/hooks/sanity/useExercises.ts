import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/queryKeys';
import {fetchWrapper} from '@/utils/fetchWrapper';
import type {ExerciseQueryResult} from '@/types/sanity';

type ResponseData = {data: ExerciseQueryResult; success: boolean};

const getExercises = async () => {
  return await fetchWrapper<ResponseData>({endpoint: 'exercises'});
};

export const useExercises = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.exercises],
    queryFn: getExercises,
  });

  if (query.error) {
    console.log('Failed to get exercises:', query.error);
  }

  return {
    exercises: query.data?.data ?? [],
    ...query,
  };
};
