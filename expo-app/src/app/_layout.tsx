import '../global.css';
import {Slot} from 'expo-router';
import Toast from 'react-native-toast-message';
import {ClerkProvider} from '@clerk/clerk-expo';
import {tokenCache} from '@clerk/clerk-expo/token-cache';
import {StatusBar} from 'expo-status-bar';

export default function Layout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <StatusBar style="dark" />
      <Slot />
      <Toast topOffset={60} />
    </ClerkProvider>
  );
}
