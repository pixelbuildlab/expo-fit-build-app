import {useQuery} from '@tanstack/react-query';
import {client} from '@/lib/sanity';
import {getSingleWorkoutQuery} from '@/groq';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getWorkoutByID = async (workoutID: string) => {
  return await client.fetch(getSingleWorkoutQuery, {
    workoutId: workoutID,
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
    workout: query.data,
    ...query,
  };
};
