// Profile Page

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useThemeMode } from '../context/ThemeContext';
import { getProfileStyles } from '../styles/ProfileStyles';
import CustomButton from '../components/CustomButton';
import ProfileItem from '../components/ProfileItem';
import { fetchAllUsers } from '../services/api/user'; // Load all users
import { getMyOrders } from '../services/api/order';   // Load all orders

export default function ProfileScreen() {
  const { isDarkMode } = useThemeMode();
  const styles = getProfileStyles(isDarkMode);
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    id: '',
    createdAt: '',
  });

  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');

        // ✅ Load and match user data
        const allUsers = await fetchAllUsers(token);
        const matchedUser = allUsers.find((u) => u._id === userId);

        if (matchedUser) {
          setUserData({
            name: matchedUser.name || 'User',
            email: matchedUser.email || 'example@example.com',
            id: matchedUser._id || 'N/A',
            createdAt: matchedUser.createdAt ? formatDate(matchedUser.createdAt) : 'N/A',
          });
        }

        // ✅ Load and filter user-specific orders
        const allOrders = await getMyOrders(token);
        const userOrders = allOrders.filter((o) => o.user?._id === userId);
        setOrderCount(userOrders.length);

      } catch (error) {
        console.error('Error loading profile:', error.message);
      }
    };

    fetchProfileData();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Account</Text>

      <View style={styles.avatarBlock}>
        <Image
          source={require('../assets/avatar.jpeg')}
          style={styles.avatar}
        />
        <Text style={styles.username}>{userData.name}</Text>
      </View>

      <View style={styles.card}>
        <ProfileItem icon="person-outline" label="Name" value={userData.name} isDarkMode={isDarkMode} />
        <ProfileItem icon="mail-outline" label="Email" value={userData.email} isDarkMode={isDarkMode} />
        <ProfileItem icon="finger-print-outline" label="User ID" value={userData.id} isDarkMode={isDarkMode} />
        <ProfileItem icon="calendar-outline" label="Registered on" value={userData.createdAt} isDarkMode={isDarkMode} />
        <ProfileItem icon="receipt-outline" label="Orders" value={`${orderCount} Orders`} isDarkMode={isDarkMode} />
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="LOG OUT"
          onPress={handleLogout}
          color={isDarkMode ? '#f7abe2' : '#000'}
          textColor={isDarkMode ? '#000' : '#fff'}
        />
      </View>
    </SafeAreaView>
  );
}
