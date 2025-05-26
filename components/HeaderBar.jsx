import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useThemeMode } from '../context/ThemeContext';
import { getHeaderBarStyles } from '../styles/HeaderBarStyles';

export default function HeaderBar() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const { isDarkMode } = useThemeMode();
  const styles = getHeaderBarStyles(isDarkMode);
  const iconColor = isDarkMode ? '#fff' : '#333';

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
          <TouchableOpacity
            onPress={() => navigation.navigate('AppTabs', { screen: 'Cart' })}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="cart-outline" size={24} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={25} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
