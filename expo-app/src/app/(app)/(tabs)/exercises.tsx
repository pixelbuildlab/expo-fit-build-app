import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  AppLoader,
  AppSafeAreaBoundary,
  AppErrorScreen,
  ExerciseCard,
  ExerciseEmptyList,
  FormTextInput,
  RefreshControlPreview,
} from '@/components';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {APP_COLORS} from '@/theme';
import {useExercises} from '@/hooks/sanity';

const Exercises = () => {
  const [searchText, setSearchText] = React.useState('');
  const {exercises, isLoading, isRefetching, isError, refetch} = useExercises();

  const router = useRouter();

  const _filteredExercises = React.useMemo(() => {
    if (!searchText) {
      return exercises;
    }

    return exercises?.filter(exercise =>
      exercise?.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [exercises, searchText]);

  return (
    <AppSafeAreaBoundary classname="bg-gray-50">
      {/* Topbar - search */}
      {/* header */}
      {/* info text */}

      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Exercise Library
        </Text>
        <Text className="text-gray-600 mt-1">
          Discover and master new exercises
        </Text>
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
                  onPress={() =>
                    router.push(`/exercise-details?id=${item._id}`)
                  }
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
    </AppSafeAreaBoundary>
  );
};

export default Exercises;
