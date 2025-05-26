import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../styles/LoginStyles';
import { useNavigation } from '@react-navigation/native';

// Reusable components
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import AuthLayout from '../components/AuthLayout';

// Notification service
import { sendLoginSuccessNotification } from '../services/notifications'; // ✅ import login success notification

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // 🔐 Handle login logic
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Basic validation
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Weak password', 'Password must be at least 8 characters.');
      return;
    }

    try {
      // Send login request
      const response = await axios.post('https://n11501910.ifn666.com/assessment02/auth/login', {
        email,
        password,
      });

      const { token, name, userId } = response.data;

      // Save user info in local storage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userName', name || email);
      await AsyncStorage.setItem('userId', userId);

      // Trigger local notification
      await sendLoginSuccessNotification();

      // Success alert & navigate to main app
      Alert.alert('Login successful!');
      navigation.replace('AppTabs');
    } catch (error) {
      // ❌ Handle login error
      Alert.alert('Login failed', error?.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <AuthLayout>
      {/* Title */}
      <Text style={styles.title}>Login</Text>

      {/* Email input */}
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password input */}
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secure={true}
      />

      {/* Submit button */}
      <CustomButton
        title="LOG IN"
        onPress={handleLogin}
      />

      {/* Navigation to Sign Up */}
      <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.linkText}>Don’t have an account? </Text>
        <Text
          style={styles.linkHighlight}
          onPress={() => navigation.navigate('Register')}
        >
          Sign Up
        </Text>
      </View>
    </AuthLayout>
  );
}
