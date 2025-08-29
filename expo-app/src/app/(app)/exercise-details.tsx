import React from 'react';
import {
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import {
  AppErrorScreen,
  AppLoader,
  AppSafeAreaBoundary,
  AppStyledGradient,
} from '@/components';
import Markdown from 'react-native-markdown-display';
import {Ionicons} from '@expo/vector-icons';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {urlFor} from '@/lib/sanity';
import {useExercisesByID} from '@/hooks/sanity';
import {useAIGuidance} from '@/hooks/ai/useAiGuidance';
import {exerciseDifficultConfigs} from '@/constants';

const ModalClose = () => {
  const router = useRouter();

  return (
    <View className="absolute top-12 left-0 right-0 px-4 z-10">
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.8}
        className="w-10 h-10 bg-black/20 rounded-full items-center justify-center backdrop-blur-sm"
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const ExerciseDetails = () => {
  const {id} = useLocalSearchParams<{id: string | null}>();
  const {exercise, isLoading, isError, isFetching, refetch} =
    useExercisesByID(id);

  const {
    content: aIContent,
    mutateAsync,
    isLoading: isAILoading,
    isError: isAIGuidanceError,
  } = useAIGuidance(id);

  const router = useRouter();

  const getAIGuidance = async () => {
    await mutateAsync();
  };

  if (isLoading || isFetching) {
    return (
      <AppSafeAreaBoundary classname="flex-1 bg-white">
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <ModalClose />
        <AppLoader />
      </AppSafeAreaBoundary>
    );
  }

  if (!exercise || isError) {
    return (
      <View className="flex-1">
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <ModalClose />
        <AppErrorScreen onRetry={refetch} onGoBack={() => router.back()} />
      </View>
    );
  }

  return (
    <AppSafeAreaBoundary classname="flex-1 bg-white">
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ModalClose />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="h-80 bg-white relative w-full">
          {exercise?.exerciseImage ? (
            <Image
              resizeMode="stretch"
              className="h-full w-full"
              source={{
                uri: urlFor(exercise?.exerciseImage.asset._ref).url(),
              }}
            />
          ) : (
            <AppStyledGradient
              colors={['#60a5fa', '#8b5cf6']}
              start={[0, 0]}
              end={[1, 1]}
              className="h-full w-full items-center justify-center"
            >
              <Ionicons name="fitness" color="white" size={80} />
            </AppStyledGradient>
          )}
          <AppStyledGradient
            colors={['black', 'transparent']}
            start={[0, 1]}
            end={[0, 0]}
            className="absolute bottom-0 left-0 right-0 h-20"
          />
        </View>
        {/* contents */}

        <View className="px-6 py-6">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-3xl font-bold text-gray-800 mb-2">
                {exercise.name}
              </Text>
              <View
                className={`self-start px-4 py-2 rounded-full ${
                  exerciseDifficultConfigs[
                    exercise.difficultyLevel
                      ? exercise.difficultyLevel
                      : 'default'
                  ].color
                }`}
              >
                <Text className="text-sm font-semibold text-white">
                  {
                    exerciseDifficultConfigs[
                      exercise?.difficultyLevel
                        ? exercise.difficultyLevel
                        : 'default'
                    ].text
                  }
                </Text>
              </View>
            </View>
            {/* */}
          </View>
          <View className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-3">
              Description
            </Text>
            <Text className="text-gray-600 leading-6 text-base">
              {exercise.description ??
                'No description available for this exercise'}
            </Text>
          </View>

          {/* vid */}
          {exercise.videoUrl && (
            <View className="mb-6">
              <Text className="text-xl font-semibold text-gray-800 mb-3">
                Video Tutorial
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Linking.openURL(exercise.videoUrl)}
                className="bg-red-500 rounded-xl p-4 flex-row items-center"
              >
                <View className="h-12 w-12 rounded-full bg-white items-center justify-center mr-4">
                  <Ionicons name="play" size={20} color="#ef4444" />
                </View>
                <View>
                  <Text className="text-white font-semibold text-lg">
                    Watch Tutorial
                  </Text>
                  <Text className="text-red-100 text-sm">
                    Learn proper form
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {/* Todo AI */}
          {(aIContent || isAILoading) && (
            <View className="mb-6">
              <View className="flex-row mb-4 items-center">
                <Ionicons name="fitness" size={24} color="#3b82f6" />
                <Text className="text-xl font-semibold text-gray-800 ml-2">
                  AI Coach says...
                </Text>
              </View>
              {isAILoading ? (
                <AppLoader
                  text="Getting personalized guidance"
                  containerClasses="bg-gray-50 rounded-xl p-4"
                />
              ) : (
                <View className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <Markdown
                    style={{
                      body: {paddingBottom: 20},
                      heading2: {
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginTop: 12,
                        marginBottom: 6,
                      },
                      heading3: {
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#374151',
                        marginTop: 8,
                        marginBottom: 4,
                      },
                    }}
                  >
                    {aIContent}
                  </Markdown>
                </View>
              )}
            </View>
          )}

          {isAIGuidanceError && (
            <View className="flex-1 mt-6 bg-red-400">
              <AppErrorScreen />
            </View>
          )}

          {/* Action */}
          <View className={`mt-6 gap-2`}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={isAILoading}
              onPress={getAIGuidance}
              className={`rounded-xl py-4 items-center ${
                isAILoading
                  ? 'bg-gray-400'
                  : aIContent
                  ? 'bg-green-500'
                  : 'bg-blue-500'
              }`}
            >
              {isAILoading ? (
                <AppLoader
                  indicatorProps={{color: '#fff', size: 'small'}}
                  text=""
                  containerClasses="py-1"
                />
              ) : (
                <Text className=" text-white font-bold text-lg">
                  {aIContent
                    ? 'Refresh AI Guidance'
                    : 'Get AI Guidance on Form & Technique'}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              className="bg-gray-200 rounded-xl py-4 items-center"
            >
              <Text className="text-lg font-bold text-gray-800">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AppSafeAreaBoundary>
  );
};

export default ExerciseDetails;
