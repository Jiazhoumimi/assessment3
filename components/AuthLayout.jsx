import React from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/LoginStyles'; 

export default function AuthLayout({ children }) {
  return (
    <LinearGradient
      colors={['#ffffff', '#b491c8']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.centeredWrapper}
      >
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.card}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
