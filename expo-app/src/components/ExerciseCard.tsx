import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {AppStyledGradient} from './AppStyledGradient';
import {urlFor} from '@/lib/sanity';
import {APP_COLORS} from '@/theme';
import {exerciseDifficultConfigs} from '@/constants';
import type {ExerciseQueryResult} from '@/types/sanity';

type ExerciseCardProps = {
  onPress: () => void;
  item: ExerciseQueryResult[0];
  showChevron?: boolean;
};

const ExerciseCard = ({onPress, item, showChevron}: ExerciseCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100"
    >
      <View className="flex-row p-6">
        <View className="w-20 h-20 bg-white rounded-xl mr-4 overflow-hidden self-center">
          {item.exerciseImage ? (
            <Image
              resizeMode="contain"
              className="h-full w-full"
              source={{uri: urlFor(item?.exerciseImage.asset._ref).url()}}
            />
          ) : (
            <AppStyledGradient
              colors={['#60a5fa', '#8b5cf6']}
              start={[0, 0]}
              end={[1, 1]}
              className="h-full w-full items-center justify-center"
            >
              <Ionicons name="fitness" color="white" size={32} />
            </AppStyledGradient>
          )}
        </View>

        <View className="flex-1 justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {item.name}
            </Text>
            <Text numberOfLines={2} className="text-gray-600 text-sm mb-2 pr-1">
              {item.description}
            </Text>
          </View>

          <View className="flex-row items-center justify-between mt-px">
            <View
              className={`px-3 py-1 rounded-full ${
                exerciseDifficultConfigs[
                  item.difficultyLevel ? item.difficultyLevel : 'default'
                ].color
              }`}
            >
              <Text className="text-xs font-semibold text-white">
                {
                  exerciseDifficultConfigs[
                    item?.difficultyLevel ? item.difficultyLevel : 'default'
                  ].text
                }
              </Text>
            </View>
            {showChevron && (
              <TouchableOpacity className="p-2">
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={APP_COLORS.lightGrayPrimary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {ExerciseCard};
