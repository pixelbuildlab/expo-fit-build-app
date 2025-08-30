import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {APP_COLORS} from '@/theme';
import {useExercises} from '@/hooks/sanity';
import {FormTextInput} from '../form';
import {ExerciseCard} from '../ExerciseCard';
import {RefreshControlPreview} from '../RefreshControlPreview';
import {AppLoader} from '../AppLoader';
import {ExerciseEmptyList} from '../ExerciseEmptyList';
import {AppErrorScreen} from '../AppErrorScreen';
import type {ExerciseQueryResult} from '@/types/sanity';

type ExercisesScreenProps = {
  onExerciseClick: (exercise: ExerciseQueryResult[number]) => void;
  onCloseIcon?: () => void;
  title: string;
  subtitle: string;
};

const ExercisesScreen = ({
  onCloseIcon,
  onExerciseClick,
  title,
  subtitle,
}: ExercisesScreenProps) => {
  const [searchText, setSearchText] = React.useState('');
  const {exercises, isLoading, isRefetching, isError, refetch} = useExercises();

  // /loging againg and aagain
  console.log('r', isRefetching, 'l', isLoading);
  const _filteredExercises = React.useMemo(() => {
    if (!searchText) {
      return exercises;
    }

    return exercises?.filter(exercise =>
      exercise?.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [exercises, searchText]);

  return (
    <>
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <View
          className={
            onCloseIcon ? 'flex-row justify-between items-center mb-4' : ''
          }
        >
          <Text className="text-2xl font-bold text-gray-900">{title}</Text>
          {onCloseIcon && (
            <TouchableOpacity
              onPress={onCloseIcon}
              activeOpacity={0.8}
              className="w-8 h-8 justify-center items-center"
            >
              <Ionicons
                name="close"
                size={24}
                color={APP_COLORS.lightGrayPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-gray-600">{subtitle}</Text>
        {/* input fields and icons */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mt-4">
          {/* custom color */}
          <Ionicons
            name="search"
            size={20}
            color={APP_COLORS.lightGrayPrimary}
          />
          <FormTextInput
            onChangeText={setSearchText}
            className="flex-1 ml-3 text-gray-800"
            placeholderTextColor="#9ca3af"
            placeholder="Search exercises..."
            value={searchText}
          />

          {searchText && (
            <TouchableOpacity
              onPress={() => setSearchText('')}
              activeOpacity={0.8}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={APP_COLORS.lightGrayPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* end topbar */}
      {/* exercise list */}
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          {!isError ? (
            <FlatList
              data={_filteredExercises}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="p-6"
              renderItem={({item}) => (
                <ExerciseCard
                  item={item}
                  onPress={() => {
                    onExerciseClick(item);
                  }}
                />
              )}
              refreshControl={
                // custom color
                <RefreshControlPreview
                  refreshing={isRefetching}
                  onRefresh={refetch}
                  title="Pull down to refresh exercises"
                  titleColor={APP_COLORS.lightGrayPrimary}
                  colors={[APP_COLORS.primaryBlue]}
                  tintColor={APP_COLORS.primaryBlue}
                />
              }
              ListEmptyComponent={<ExerciseEmptyList searchText={searchText} />}
            />
          ) : (
            <AppErrorScreen onRetry={refetch} />
          )}
        </>
      )}
    </>
  );
};

export {ExercisesScreen};
