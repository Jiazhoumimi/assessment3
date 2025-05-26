// introduce this app

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useThemeMode } from '../context/ThemeContext';

export default function AboutScreen() {
  const { isDarkMode } = useThemeMode();
  const styles = getAboutStyles(isDarkMode);

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>About 666 Order Management</Text>

          <Text style={styles.paragraph}>
            This is a wholesale order management app. Users can browse products, create orders for clients, and track their records.
          </Text>

          <Text style={styles.paragraph}>
            Built as an extension of Assessment 2 - product management, this version added order management function.
          </Text>

          <Text style={styles.paragraph}>
            Key features:
          </Text>
          <Text style={styles.bullet}>• View Products by Category & Sorting</Text>
          <Text style={styles.bullet}>• Get Orders by ID</Text>
          <Text style={styles.bullet}>• Create & Edit Orders</Text>
          <Text style={styles.bullet}>• Profile & Settings</Text>
          <Text style={styles.bullet}>• Dark Mode with Shake</Text>
          <Text style={styles.bullet}>• Notifications & Share</Text>
          <Text style={styles.bullet}>• UI: Carousel with pagination dots</Text>

          <Text style={styles.footer}>Version 1.0.0 | By Cecilia</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function getAboutStyles(isDarkMode) {
  return StyleSheet.create({
    background: {
      flex: 1,
    },
    overlay: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.75)', // transparent
      borderRadius: 24,
      padding: 20,
      maxWidth: 320,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: '#111',
      marginBottom: 12,
      textAlign: 'center',
    },
    paragraph: {
      fontSize: 15,
      lineHeight: 22,
      color: '#111',
      textAlign: 'left',
      marginBottom: 10,
    },
    bullet: {
      fontSize: 15,
      color: '#111',
      textAlign: 'left',
      marginLeft: 8,
      marginBottom: 6,
    },
    footer: {
      marginTop: 16,
      fontSize: 13,
      color: '#777',
      textAlign: 'center',
    },
  });
}
