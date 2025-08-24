import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  AppLoader,
  AppSafeAreaBoundary,
  ExerciseCard,
  ExerciseEmptyList,
  FormTextInput,
  RefreshControlPreview,
} from '@/components';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {defineQuery} from 'groq';
import {client} from '@/lib/sanity';
import {APP_COLORS} from '@/theme';
import type {ExerciseQueryResult} from '@/types/sanity';

export const exerciseQuery = defineQuery(
  `*[_type == "exercise" && isActive == true]`,
);

const Exercises = () => {
  const [searchText, setSearchText] = React.useState('');
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isFetched, setIsFetched] = React.useState(false);

  const [exercises, setExercises] = React.useState<ExerciseQueryResult>([]);

  const router = useRouter();

  const fetchExercises = async () => {
    try {
      const apiExercises = await client.fetch(exerciseQuery);
      // console.log(apiExercises, 'api-exercise');

      setExercises(apiExercises);
      setIsFetched(true);
    } catch (error) {
      console.error(`Error fetching exercises: Error: ${error}`);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchExercises();
    setIsRefreshing(false);
  };

  React.useEffect(() => {
    if (!isFetched) {
      fetchExercises();
    }
  }, [isFetched]);

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
        <Text className="text-gray-600 mt1">
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
      {!isFetched ? (
        <AppLoader />
      ) : (
        <>
          <FlatList
            data={_filteredExercises}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 24}}
            renderItem={({item}) => (
              <ExerciseCard
                item={item}
                onPress={() => router.push(`/exercise-details?id=${item._id}`)}
              />
            )}
            refreshControl={
              // custom color
              <RefreshControlPreview
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                title="Pull down to refresh exercises"
                titleColor={APP_COLORS.lightGrayPrimary}
                colors={[APP_COLORS.primaryBlue]}
                tintColor={APP_COLORS.primaryBlue}
              />
            }
            ListEmptyComponent={<ExerciseEmptyList searchText={searchText} />}
          />
        </>
      )}
    </AppSafeAreaBoundary>
  );
};

export default Exercises;
