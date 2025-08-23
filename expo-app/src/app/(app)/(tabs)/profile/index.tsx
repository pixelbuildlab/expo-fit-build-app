import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {AppSafeAreaBoundary} from '@/components';
import {Ionicons} from '@expo/vector-icons';
import {useAuth} from '@clerk/clerk-expo';

export default function Page() {
  const {signOut} = useAuth();

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure, you want to sign out?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Sign Out', style: 'destructive', onPress: () => signOut()},
    ]);
  };

  return (
    <AppSafeAreaBoundary>
      <Text>Profile</Text>

      <View className="px-6 mb-8">
        <TouchableOpacity
          onPress={handleSignOut}
          activeOpacity={0.8}
          className={`rounded-xl p-4 shadow-sm  bg-red-600`}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={20} color="#fff" />

            <Text className="text-white font-semibold text-lg ml-2">
              Sign out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </AppSafeAreaBoundary>
  );
}
