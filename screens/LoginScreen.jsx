// Login Screen

import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../styles/LoginStyles';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '@env'; // ✅ import API in .env 

// Reusable components
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import AuthLayout from '../components/AuthLayout';

// Notification service
import { sendLoginSuccessNotification } from '../services/notifications'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // 🔐 Handle login logic
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      // ✅ Use the API in .env
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, name, userId } = response.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userName', name || email);
      await AsyncStorage.setItem('userId', userId);

      await sendLoginSuccessNotification();
      Alert.alert('Login successful!');
      navigation.replace('AppTabs');
    } catch (error) {
      Alert.alert('Login failed', error?.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Login</Text>

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secure={true}
      />

      <CustomButton
        title="LOG IN"
        onPress={handleLogin}
      />

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
