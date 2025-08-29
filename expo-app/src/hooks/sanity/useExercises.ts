import {useQuery} from '@tanstack/react-query';
import {client} from '@/lib/sanity';
import {exerciseQuery} from '@/groq';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getExercises = async () => {
  return await client.fetch(exerciseQuery);
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
    exercises: query.data ?? [],
    ...query,
  };
};
