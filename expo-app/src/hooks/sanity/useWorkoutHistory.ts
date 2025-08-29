import {useQuery} from '@tanstack/react-query';
import {useUser} from '@clerk/clerk-expo';
import {client} from '@/lib/sanity';
import {getWorkoutQuery} from '@/groq';
import {QUERY_KEYS} from '@/constants/queryKeys';

const getWorkoutHistory = async (userID: string) => {
  return await client.fetch(getWorkoutQuery, {
    userId: userID,
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
    workouts: query.data ?? [],
    ...query,
  };
};
