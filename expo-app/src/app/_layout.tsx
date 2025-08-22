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
    // <Tabs>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       headerShown: false,
    //       tabBarIcon: ({color, size}) => (
    //         <AntDesign name="home" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: 'Profile',
    //       headerShown: false,
    //       tabBarIcon: ({color, size}) => (
    //         <AntDesign name="user" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="history"
    //     options={{
    //       title: 'History',
    //       headerShown: false,
    //       tabBarIcon: ({color, size}) => (
    //         <AntDesign name="clockcircle" color={color} size={size} />
    //       ),
    //     }}
    //   />
    // </Tabs>
  );
}
