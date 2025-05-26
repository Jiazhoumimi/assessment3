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

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
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

    if (password !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('https://n11501910.ifn666.com/assessment02/auth/register', {
        name,
        email,
        password,
      });

      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userName', name);

      Alert.alert('Registration successful!');
      navigation.replace('AppTabs');
    } catch (error) {
      Alert.alert('Register failed', error?.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Register</Text>

      <InputField
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        placeholder="Password"
        secure={true}
        value={password}
        onChangeText={setPassword}
      />
      <InputField
        placeholder="Confirm Password"
        secure={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <CustomButton
        title="SIGN UP"
        onPress={handleRegister}
      />

      {/* Bottom login prompt */}
      <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.linkText}>Already have an account? </Text>
        <Text
          style={styles.linkHighlight}
          onPress={() => navigation.navigate('Login')}
        >
          Log In
        </Text>
      </View>
    </AuthLayout>
  );
}
