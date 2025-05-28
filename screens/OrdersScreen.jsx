// OrdersScreen.jsx
// Show summary order information using data fetched from the backend API

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import HeaderBar from '../components/HeaderBar';
import OrderCard from '../components/OrderCard';
import { useThemeMode } from '../context/ThemeContext';
import styles from '../styles/OrdersScreenStyles';
import { API_BASE_URL } from '@env'; // Load API from .env file

export default function OrdersScreen() {
  const { isDarkMode } = useThemeMode();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const scrollRef = useRef();

  const highlightOrderId = route.params?.highlightOrderId || null;

  // Fetch all orders and filter current user's orders
  const fetchOrders = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    if (!token || !userId) {
      setLoading(false);
      return;
    }
  // ✅ API URL
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const json = await res.json();
      const allOrders = json.data || [];

      // Filter orders created by current user
      const userOrders = allOrders
        .filter(
          (order) =>
            order.user?._id === userId &&
            order.shippingAddress?.street &&
            Array.isArray(order.products)
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setOrders(userOrders);

      // Scroll to a highlighted order if passed via route
      if (highlightOrderId) {
        const index = userOrders.findIndex((o) => o._id === highlightOrderId);
        if (index !== -1 && scrollRef.current) {
          setTimeout(() => {
            scrollRef.current.scrollTo({ y: index * 160, animated: true });
          }, 500);
        }
      }
    } catch (err) {
      console.error('❌ Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh orders when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#111' : '#fff' }}>
      <HeaderBar title="My Orders" />

      {/* Order History title */}
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: isDarkMode ? '#fff' : '#111',
          }}
        >
          Order History
        </Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#ff69b4" />
        </View>
      ) : orders.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles(isDarkMode).emptyText}>No orders found.</Text>
        </View>
      ) : (
        <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 16, paddingBottom: 30 }}>
          {orders.map((item) => (
            <OrderCard
              key={item._id}
              order={item}
              isDarkMode={isDarkMode}
              isHighlighted={item._id === highlightOrderId}
              onPress={() => navigation.navigate('OrderDetail', { order: item })}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}