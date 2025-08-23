import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {Text, View} from 'react-native';

type ExerciseEmptyListProps = {
  searchText: string;
};
const ExerciseEmptyList = ({searchText}: ExerciseEmptyListProps) => {
  return (
    <View className="bg-white rounded-2xl p-8 items-center">
      {/* custom color */}
      <Ionicons name="fitness-outline" size={64} color="#9ca3af" />
      <Text className="text-xl font-semibold text-gray-900 mt-4">
        {searchText ? 'No exercises found' : 'Loading exercises...'}
      </Text>
      <Text className="text-gray-600 mt-2 text-center">
        {searchText
          ? 'Try adjusting your search'
          : 'Your exercises will appear here'}
      </Text>
    </View>
  );
};

export {ExerciseEmptyList};
