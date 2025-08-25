import '../global.css';
import {Slot} from 'expo-router';
import Toast from 'react-native-toast-message';
import {ClerkProvider} from '@clerk/clerk-expo';
import {tokenCache} from '@clerk/clerk-expo/token-cache';
import {StatusBar} from 'expo-status-bar';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({defaultOptions: {queries: {retry: 1}}});

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache}>
        <StatusBar style="dark" />
        <Slot />
        <Toast topOffset={60} />
      </ClerkProvider>
    </QueryClientProvider>
  );
}
