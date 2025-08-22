import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Link, useRouter} from 'expo-router';
import {useSignIn, useSignUp} from '@clerk/clerk-expo';
import {Ionicons} from '@expo/vector-icons';
import {AppSafeAreaBoundary} from '@/components/AppSafeAreaBoundary';
import {AccountVerifyScreen} from '@/components/AccountVerifyScreen';
import AuthScreenDivider from '@/components/AuthScreenDivider';
import {GoogleSignIn} from '@/components/GoogleSignIn';
import Toast from 'react-native-toast-message';
import {isValidEmail} from '@/utils';

export default function Page() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPassHidden, setIsPassHidden] = React.useState(true);
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {isLoaded, signUp, setActive} = useSignUp();
  const router = useRouter();

  const [pendingVerification, setPendingVerification] = React.useState(false);

  const onSignUpPress = async () => {
    if (!emailAddress || password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Missing information',
        text2: !emailAddress
          ? 'Please enter your email address'
          : password.length
          ? 'Password length too short'
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

    // Start sign-up process using email and password provided
    try {
      setIsLoading(true);
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({strategy: 'email_code'});

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async (code: string) => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({session: signUpAttempt.createdSessionId});
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <AccountVerifyScreen
        emailAddress={emailAddress}
        onCodeVerify={onVerifyPress}
        isLoading={isLoading}
      />
    );
  }

  return (
    <AppSafeAreaBoundary>
      <KeyboardAwareScrollView
        className="flex-1 p-4"
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
                Join FitBuild
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                Start your fitness journey {'\n'}and achieve your goals
              </Text>
            </View>
            {/* Sign up main form */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
              <Text className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Create Your Account
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
              <View className="mb-2">
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
                    secureTextEntry={isPassHidden}
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
                <Text className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </Text>
              </View>
              <Text className="my-2 text-xs text-gray-500 mb-4">
                By singing up, you agree to our Terms of Services and Privacy
                Policy
              </Text>
              <TouchableOpacity
                onPress={onSignUpPress}
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
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color="#fff"
                    />
                  )}
                  <Text className="text-white font-semibold text-lg ml-2">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </View>
              </TouchableOpacity>
              <AuthScreenDivider />
              <GoogleSignIn />
            </View>

            <View className="flex-row justify-center items-center mt-2 pb-6">
              <Text className="text-gray-600">Already have an account? </Text>
              <Link href="/sign-in" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-600 font-semibold">Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          <View className="pb-6">
            <Text className="text-gray-500 text-center text-sm">
              Ready to transform your fitness?
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AppSafeAreaBoundary>
  );
}
