import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Link, useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {useSignIn} from '@clerk/clerk-expo';
import {AppSafeAreaBoundary} from '@/components/AppSafeAreaBoundary';
import {GoogleSignIn} from '@/components/GoogleSignIn';
import AuthScreenDivider from '@/components/AuthScreenDivider';
import Toast from 'react-native-toast-message';
import {isValidEmail} from '@/utils';

export default function Page() {
  const {signIn, setActive, isLoaded} = useSignIn();
  const router = useRouter();

  const [isPassHidden, setIsPassHidden] = React.useState(true);

  const [isLoading, setIsLoading] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!emailAddress || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing information',
        text2: !emailAddress
          ? 'Please enter your email address'
          : 'Please enter your password',
      });

      return;
    }
    if (!isValidEmail(emailAddress)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter valid email address',
      });
      return;
    }

    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      setIsLoading(true);

      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({session: signInAttempt.createdSessionId});
        router.replace('/');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppSafeAreaBoundary>
      <KeyboardAwareScrollView
        className="flex-1 p-4"
        // extraScrollHeight={30}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}
      >
        <View className="flex-1 px-3">
          <View className="flex-1 justify-center">
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 round-2xl mb-4 items-center justify-center shadow-lg">
                <Ionicons name="fitness" size={40} color="#fff" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                FitBuild
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                Track your fitness journey {'\n'}and reach your goals
              </Text>
            </View>
            {/* Sign in main form */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
              <Text className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Welcome Back
              </Text>
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </Text>
                <View className="flex-row items-center px-4 py-4 rounded-xl bg-gray-50 border border-gray-200">
                  {/* custom color */}
                  <Ionicons name="mail-outline" size={20} color="#6b7280" />
                  <TextInput
                    value={emailAddress}
                    autoCapitalize="none"
                    placeholder="Enter your email"
                    className="flex-1 ml-3 text-gray-900 py-0"
                    textAlignVertical="center"
                    onChangeText={setEmailAddress}
                    editable={!isLoading}
                  />
                </View>
              </View>
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </Text>
                <View className="flex-row items-center px-4 py-4 rounded-xl bg-gray-50 border border-gray-200">
                  {/* custom color */}
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#6b7280"
                  />
                  <TextInput
                    value={password}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Enter your password"
                    className="flex-1 ml-3 text-gray-900 py-0"
                    textAlignVertical="center"
                    onChangeText={setPassword}
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setIsPassHidden(preState => !preState);
                    }}
                  >
                    <Ionicons
                      name={isPassHidden ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={onSignInPress}
                disabled={isLoading}
                activeOpacity={0.8}
                className={`rounded-xl py-4 shadow-sm ${
                  isLoading ? 'bg-gray-400' : 'bg-blue-600'
                }`}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <Ionicons name="refresh" size={20} color="#fff" />
                  ) : (
                    <Ionicons name="log-in-outline" size={20} color="#fff" />
                  )}
                  <Text className="text-white font-semibold text-lg ml-2">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Text>
                </View>
              </TouchableOpacity>

              <AuthScreenDivider />
              {/* Google Implementation */}
              <GoogleSignIn />
            </View>

            <View className="flex-row justify-center items-center mt-2 pb-6">
              <Text className="text-gray-600">Don't have an account? </Text>
              <Link href="/sign-up" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-600 font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          <View className="pb-6">
            <Text className="text-gray-500 text-center text-sm">
              Start your fitness journey today
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AppSafeAreaBoundary>
  );
}
