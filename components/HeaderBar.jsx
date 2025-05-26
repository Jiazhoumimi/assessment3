// headerbar navigation
// show username, setting icon, cart icon.

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useThemeMode } from '../context/ThemeContext';
import { getHeaderBarStyles } from '../styles/HeaderBarStyles';
import { useCart } from '../context/CartContext'; // import cart context

export default function HeaderBar() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const { isDarkMode } = useThemeMode();
  const styles = getHeaderBarStyles(isDarkMode);
  const iconColor = isDarkMode ? '#fff' : '#333';

  const { cartItems } = useCart(); // access cart data
  const cartCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0); // ✅ total count

  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem('userName');
      setUsername(name || 'User');
    })();
  }, []);

  return (
    <SafeAreaView style={styles.headerContainer} edges={['top', 'left', 'right']}>
      <StatusBar
        backgroundColor={isDarkMode ? '#000' : '#fce3ef'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <View style={styles.row}>
        <View>
          <Text style={styles.helloText}>Hello {username}</Text>
          <Text style={styles.questionText}>Wish you have a glamorous day！</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Cart with badge */}
          <TouchableOpacity
            onPress={() => navigation.navigate('AppTabs', { screen: 'Cart' })}
            style={{ marginRight: 16 }}
          >
            <View>
              <Ionicons name="cart-outline" size={24} color={iconColor} />
              {cartCount > 0 && (
                <View style={badgeStyles.badge}>
                  <Text style={badgeStyles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={25} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ✅ Badge styles
const badgeStyles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
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
});
