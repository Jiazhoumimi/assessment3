import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProfileItemStyles } from '../styles/ProfileItemStyles';

export default function ProfileItem({ icon, label, value, isDarkMode }) {
  const styles = getProfileItemStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.leftBlock}>
        <Ionicons
          name={icon}
          size={22}
          color={isDarkMode ? '#fff' : '#444'}
          style={styles.icon}
        />
        <View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    </View>
  );
}
