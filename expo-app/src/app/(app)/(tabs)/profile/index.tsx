import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppSafeAreaBoundary, WorkoutStatsCard} from '@/components';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {useAuth, useUser} from '@clerk/clerk-expo';
import elevations from 'react-native-elevation';
import {useRouter} from 'expo-router';
import {APP_COLORS} from '@/theme';
import {formatJoinDate} from '@/utils/time';

export default function Page() {
  const {signOut} = useAuth();
  const router = useRouter();
  const {user} = useUser();

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure, you want to sign out?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Sign Out', style: 'destructive', onPress: () => signOut()},
    ]);
  };

  const handleClick = (route: string) => {
    router.push(`/(account)/${route}`);
  };

  const userJoinDate = user.createdAt ?? new Date();

  return (
    <AppSafeAreaBoundary>
      <ScrollView className="flex-1">
        <View className="px-6 pt-8 pb-6">
          <Text className="text-gray-900 font-bold text-3xl">Profile</Text>
          <Text className="text-lg text-gray-600 mt-1">
            Manage your account and stats
          </Text>
        </View>

        <View className="px-6 pb-6">
          <View
            className="bg-white rounded-2xl p-6 border border-gray-100"
            style={{...elevations[2]}}
          >
            <View className="flex-row items-center mb-2">
              <View className="h-16 w-16 bg-gray-300 rounded-full items-center justify-center mr-4">
                {true ? (
                  <Image
                    source={{
                      // uri: user?.imageUrl ?? user.externalAccounts[0]?.imageUrl,
                      uri: 'https://avatar.iran.liara.run/public/36',
                    }}
                    className="rounded-full h-16 w-16"
                  />
                ) : (
                  <AntDesign
                    name="user"
                    size={48}
                    color={APP_COLORS.darkerGray}
                  />
                )}
              </View>
              <View className="flex-1 gap-px">
                <Text className="text-xl font-semibold text-gray-900">
                  {user.firstName && user.lastName
                    ? user.firstName + ' ' + user.lastName
                    : user?.firstName ?? 'User'}
                </Text>
                <Text className="text-gray-600">
                  {user.emailAddresses[0]?.emailAddress}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  Member since {formatJoinDate(userJoinDate)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/*  */}
        <WorkoutStatsCard title="Your Fitbuild Stats" showAverage={true} />

        {/* account  */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Account Settings
          </Text>

          <View
            className="bg-white rounded-2xl border border-gray-100"
            style={{...elevations[2]}}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleClick('account')}
              className="flex-row items-center p-4 justify-between border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Ionicons
                    size={20}
                    color={APP_COLORS.primaryBlue}
                    name="person-outline"
                  />
                </View>
                <Text className="text-gray-900 font-medium">Edit Profile</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={APP_COLORS.lightGrayPrimary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleClick('notifications')}
              className="flex-row items-center p-4 justify-between border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                  <Ionicons
                    size={20}
                    color="#10b981"
                    name="notifications-outline"
                  />
                </View>
                <Text className="text-gray-900 font-medium">Notifications</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={APP_COLORS.lightGrayPrimary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleClick('preferences')}
              className="flex-row items-center p-4 justify-between border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
                  <Ionicons size={20} color="#8b5cf6" name="settings-outline" />
                </View>
                <Text className="text-gray-900 font-medium">Preferences</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={APP_COLORS.lightGrayPrimary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleClick('help')}
              className="flex-row items-center p-4 justify-between border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                  <Ionicons
                    size={20}
                    color="#f59e0b"
                    name="help-circle-outline"
                  />
                </View>
                <Text className="text-gray-900 font-medium">
                  Help & Support
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={APP_COLORS.lightGrayPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 mb-8">
          <TouchableOpacity
            onPress={handleSignOut}
            activeOpacity={0.8}
            style={{...elevations[2]}}
            className={`rounded-xl p-4 bg-red-600`}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="log-out-outline" size={20} color="#fff" />

              <Text className="text-white font-semibold text-lg ml-2">
                Sign out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppSafeAreaBoundary>
  );
}
