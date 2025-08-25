import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {Ionicons} from '@expo/vector-icons';
import {AppSafeAreaBoundary} from './AppSafeAreaBoundary';
import {FormTextInput} from './form/FormTextInput';
import {AppStyledGradient} from './AppStyledGradient';

type AccountVerifyScreenProps = {
  emailAddress: string;
  onCodeVerify: (code: string) => void;
  isLoading: boolean;
};
export function AccountVerifyScreen({
  emailAddress,
  onCodeVerify,
  isLoading,
}: AccountVerifyScreenProps) {
  const [code, setCode] = React.useState('');

  const onVerifyPress = async () => {
    if (!code) {
      Toast.show({
        type: 'error',
        text1: 'Missing information',
        text2: 'Please enter your code',
      });
      return;
    }
    onCodeVerify(code);
  };

  return (
    <AppSafeAreaBoundary>
      <KeyboardAwareScrollView
        className="flex-1 p-4"
        keyboardShouldPersistTaps="handled"
        // contentContainerStyle={{flexGrow: 1}}
        contentContainerClassName="flex-grow"
      >
        <View className="flex-1 px-3">
          <View className="flex-1 justify-center">
            <View className="items-center mb-8">
              <AppStyledGradient
                colors={['#2563eb', '#7e22ce']}
                start={[0, 0]}
                end={[1, 1]}
                className="w-20 h-20 rounded-2xl mb-4 items-center justify-center shadow-lg"
              >
                <Ionicons name="mail" size={40} color="#fff" />
              </AppStyledGradient>

              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Check Your Email
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                We have sent a verification code to {'\n'} {emailAddress}
              </Text>
            </View>
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
              <Text className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Enter Verification Code
              </Text>
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </Text>
                <View className="flex-row items-center px-4 py-4 rounded-xl bg-gray-50 border border-gray-200">
                  {/* custom color */}
                  <Ionicons name="key-outline" size={20} color="#6b7280" />
                  <FormTextInput
                    value={code}
                    autoCapitalize="none"
                    placeholder="Enter 6-digit code"
                    className="flex-1  text-gray-900 py-0 text-center tracking-widest"
                    textAlignVertical="center"
                    keyboardType="number-pad"
                    onChangeText={setCode}
                    maxLength={6}
                    editable={!isLoading}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={onVerifyPress}
                disabled={isLoading}
                activeOpacity={0.8}
                className={`rounded-xl py-4 shadow-sm  mb-4 ${
                  isLoading ? 'bg-gray-400' : 'bg-green-600'
                }`}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <Ionicons name="refresh" size={20} color="#fff" />
                  ) : (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={20}
                      color="#fff"
                    />
                  )}
                  <Text className="text-white font-semibold text-lg ml-2">
                    {isLoading ? 'Verifying...' : 'Verify Email'}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="py-2" activeOpacity={0.8}>
                <Text className="text-blue-600 font-medium text-center">
                  Didn't receive code? Resend
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="pb-6">
            <Text className="text-gray-500 text-center text-sm">
              Almost there! Just one step away from fitness journey
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AppSafeAreaBoundary>
  );
}
