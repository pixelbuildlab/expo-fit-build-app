import {Link, Stack} from 'expo-router';
import {View, Text, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {APP_COLORS} from '@/theme';
import {AppSafeAreaBoundary} from '@/components/AppSafeAreaBoundary';
import elevations from 'react-native-elevation';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Page Not Found'}} />
      <AppSafeAreaBoundary>
        <View className="flex-1 bg-white justify-center items-center px-8">
          {/* 404 Icon */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center mb-6">
              <Ionicons
                name="search"
                size={48}
                color={APP_COLORS.lightGrayPrimary}
              />
            </View>
          </View>

          {/* Title */}
          <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
            Page Not Found
          </Text>

          {/* Message */}
          <Text className="text-gray-600 text-center text-base leading-6 mb-12 max-w-sm">
            The page you're looking for doesn't exist or has been moved.
          </Text>

          {/* Home Button */}
          <Link href="/" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-full rounded-xl py-4 px-6"
              style={{
                backgroundColor: APP_COLORS.primaryBlue,
                ...elevations[2],
              }}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="home" size={20} color="white" />
                <Text className="font-semibold text-lg text-white ml-2">
                  Go to Home
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      </AppSafeAreaBoundary>
    </>
  );
}
