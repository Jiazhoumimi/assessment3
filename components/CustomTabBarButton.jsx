// components/CustomTabBarButton.jsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTabBarButton({ onPress }) {
  const cartCount = 4; // TODO: Replace with dynamic state from context or AsyncStorage

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name="bag-outline" size={26} color="#fff" />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </View>
      <Text style={styles.label}>Bag</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    top: -18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 6,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    paddingHorizontal: 5,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});
