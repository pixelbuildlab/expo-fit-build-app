import {useIsMutating, useMutation} from '@tanstack/react-query';
import {fetchWrapper} from '@/utils/fetchWrapper';
import {QUERY_KEYS} from '@/constants/queryKeys';

type Instructions = {data: {instructions: string}};

const getAiGuidance = async (exerciseID: string) => {
  return await fetchWrapper<Instructions>({
    method: 'POST',
    endpoint: 'ai/exercise-instructions',
    body: {exerciseID},
  });
};

export const useAIGuidance = (exerciseID: string) => {
  const isMutatingPosts = useIsMutating({mutationKey: [QUERY_KEYS.aiGuidance]});

  const mutation = useMutation({
    mutationFn: () => getAiGuidance(exerciseID),
    mutationKey: [QUERY_KEYS.aiGuidance],
    onError: error => {
      console.log(
        'Failed to fetch AI Guidance for exercise: ',
        exerciseID,
        error,
      );
    },
  });

  return {
    content: mutation.data?.data.instructions,
    ...mutation,
    isLoading: !!isMutatingPosts,
  };
};
