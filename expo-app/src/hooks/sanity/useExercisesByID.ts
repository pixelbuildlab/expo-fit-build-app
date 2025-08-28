import {useQuery} from '@tanstack/react-query';
import {client} from '@/lib/sanity';
import {singleExerciseQuery} from '@/groq';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getExerciseByID = async (exerciseID: string) => {
  return await client.fetch(singleExerciseQuery, {id: exerciseID});
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
    exercise: query.data,
    ...query,
  };
};
