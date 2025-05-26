// screens/SettingsScreen.jsx
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Switch,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Accelerometer } from 'expo-sensors';

import { useThemeMode } from '../context/ThemeContext';
import { getSettingsStyles } from '../styles/SettingsStyles';
import SettingsRow from '../components/SettingsRow';
import {
  setupNotificationHandler,
  sendTestNotification,
} from '../services/notifications';

// Request notification permissions
const requestNotificationPermission = async () => {
  const { status } = await import('expo-notifications').then((mod) =>
    mod.requestPermissionsAsync()
  );
  return status;
};

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const navigation = useNavigation();
  const styles = getSettingsStyles(isDarkMode);

  const [shakeEnabled, setShakeEnabled] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const lastShakeRef = useRef(Date.now());

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Initialize local notification permissions and handlers
  useEffect(() => {
    setupNotificationHandler();
  }, []);

  // Set up shake-to-toggle dark mode
  useEffect(() => {
    if (shakeEnabled) {
      const sub = Accelerometer.addListener((data) => {
        const totalForce = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
        const now = Date.now();

        if (totalForce > 2.3 && now - lastShakeRef.current > 2000) {
          lastShakeRef.current = now;
          toggleTheme();
        }
      });

      setSubscription(sub);
    } else {
      subscription?.remove();
      setSubscription(null);
    }

    return () => subscription?.remove();
  }, [shakeEnabled]);

  // Log out and clear storage
  const handleLogout = async () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('userName');
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  // Open mail app to send user feedback
  const handleFeedback = () => {
    const email = 'cecilia.lo1@icloud.com';
    const subject = encodeURIComponent('App Feedback: 666 ORDER MANAGEMENT');
    const body = encodeURIComponent('Hi Cecilia,\n\nI would like to share the following feedback:\n');
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert('Error', 'Could not open your email app.');
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar
        backgroundColor={isDarkMode ? '#000' : '#FCEEF2'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <Text style={styles.title}>Settings</Text>

      {/* Toggle Notifications */}
      <SettingsRow
        icon={
          <Ionicons
            name="notifications-outline"
            size={20}
            color={isDarkMode ? '#fff' : '#111'}
            style={styles.icon}
          />
        }
        label="Enable Notifications"
        action={() => {}}
        rightComponent={
          <Switch
            value={notificationsEnabled}
            onValueChange={async (newValue) => {
              if (newValue) {
                const status = await requestNotificationPermission();
                const granted = status === 'granted';
                setNotificationsEnabled(granted);
                if (!granted) {
                  Alert.alert('Permission denied', 'Notifications are disabled in system settings.');
                }
              } else {
                setNotificationsEnabled(false);
              }
            }}
          />
        }
        styles={styles}
      />

      {/* Toggle dark mode manually */}
      <SettingsRow
        icon={
          <Feather
            name="moon"
            size={20}
            color={isDarkMode ? '#fff' : '#111'}
            style={styles.icon}
          />
        }
        label="Dark Mode"
        action={toggleTheme}
        rightComponent={
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        }
        styles={styles}
      />

      {/* App version display */}
      <SettingsRow
        icon={
          <Feather
            name="info"
            size={20}
            color={isDarkMode ? '#fff' : '#111'}
            style={styles.icon}
          />
        }
        label="App Version"
        action={() => {}}
        rightComponent={<Text style={styles.version}>v1.0.0</Text>}
        styles={styles}
      />

      {/* Shake gesture toggle */}
      <SettingsRow
        icon={
          <MaterialCommunityIcons
            name="gesture-double-tap"
            size={20}
            color={isDarkMode ? '#fff' : '#111'}
            style={styles.icon}
          />
        }
        label="Shake to Toggle Theme"
        action={() => setShakeEnabled(!shakeEnabled)}
        rightComponent={
          <Switch
            value={shakeEnabled}
            onValueChange={() => setShakeEnabled(!shakeEnabled)}
          />
        }
        subText="Shake your phone to toggle dark mode"
        styles={styles}
      />

      {/* Send a test notification */}
      <SettingsRow
        icon={
          <Ionicons
            name="notifications-circle-outline"
            size={20}
            color={isDarkMode ? '#fff' : '#111'}
            style={styles.icon}
          />
        }
        label="Send Test Notification"
        action={sendTestNotification}
        styles={styles}
      />

      {/* Feedback */}
      <SettingsRow
        icon={
          <Feather
            name="mail"
            size={20}
            color={isDarkMode ? '#fff' : '#111'}
            style={styles.icon}
          />
        }
        label="Send App Feedback"
        action={handleFeedback}
        styles={styles}
      />

      {/* About page */}
      <SettingsRow
        icon={
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={isDarkMode ? '#fff' : '#111'}
            style={styles.icon}
          />
        }
        label="About App"
        action={() => navigation.navigate('About')}
        styles={styles}
      />

      {/* Logout button in SettingsRow format */}
      <SettingsRow
        icon={
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#d8135e"
            style={styles.icon}
          />
        }
        label="Log Out"
        action={handleLogout}
        styles={styles}
      />
    </SafeAreaView>
  );
}
