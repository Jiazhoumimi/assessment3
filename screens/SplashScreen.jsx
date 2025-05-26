// screens/SplashScreen.jsx
// show time: 1S

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* App logo */}
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />

      {/* App name */}
      <Text style={styles.titleLine1}>666 ORDER</Text>
      <Text style={styles.titleLine2}>MANAGEMENT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  titleLine1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff69b4',
    textAlign: 'center',
    letterSpacing: 2,
    lineHeight: 40,
  },
  titleLine2: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff69b4',
    textAlign: 'center',
    letterSpacing: 2,
    lineHeight: 40,
  },
});
