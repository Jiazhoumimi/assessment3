import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import { ThemeProvider } from './context/ThemeContext'; // 
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider> 
        <StatusBar style="dark" />
        <MainNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
