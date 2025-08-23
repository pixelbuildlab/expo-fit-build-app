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
import {AppLoader, AppSafeAreaBoundary, AppStyledGradient} from '@/components';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {defineQuery} from 'groq';
import {client, urlFor} from '@/lib/sanity';
import {exerciseDifficultConfigs} from '@/constants';
import type {Exercise} from '@/types/sanity';

const singleExerciseQuery = defineQuery(
  '*[_type == "exercise" && _id == $id][0]',
);
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
  const [exercise, setExercise] = React.useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [aIContent, setAIcontent] = React.useState('');
  const [isAILoading, setIsAILoading] = React.useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const exerciseData = await client.fetch(singleExerciseQuery, {id});
      setExercise(exerciseData);
    } catch (error) {
      console.log('Error fetching single exercise:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const getAIGuidance = () => {};

  if (isLoading) {
    return (
      <AppSafeAreaBoundary classname="flex-1 bg-white">
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <ModalClose />
        <AppLoader />
      </AppSafeAreaBoundary>
    );
  }

  if (!exercise) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-gray-500">Unable to get exercise details</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          className="mt-4 px-6 bg-blue-500 py-3 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
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
              <Ionicons name="fitness" color="red" size={80} />
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

          {/* Action */}
          <View className="mt-8 gap-2">
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={isAILoading}
              onPress={() => {}}
              className={`rounded-xl py-4 items-center ${
                isAILoading
                  ? 'bg-gray-400'
                  : aIContent
                  ? 'bg-green-500'
                  : 'bg-blue-500'
              }`}
            >
              {false ? (
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
