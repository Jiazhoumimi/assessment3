// components/InputField.jsx
// for login and register page


import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField({ value, onChangeText, placeholder, secure = false }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoCapitalize="none"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      keyboardType={placeholder.toLowerCase().includes('email') ? 'email-address' : 'default'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#b491c8',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
});
