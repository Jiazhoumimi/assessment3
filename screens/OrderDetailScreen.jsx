// Show Order Details
// Navigated from Order Screen

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeMode } from '../context/ThemeContext';

import HeaderBar from '../components/HeaderBar';
import OrderDetailCard from '../components/OrderDetailCard';
import EditOrderModal from '../components/EditOrderModal';
import { getOrderDetailStyles } from '../styles/OrderDetailStyles';
import { API_BASE_URL } from '@env'; // Import API URL from .env

export default function OrderDetailScreen() {
  const { isDarkMode } = useThemeMode();
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;

  // Local state to store current order and modal status
  const [currentOrder, setCurrentOrder] = useState(order);
  const [showEdit, setShowEdit] = useState(false);

  const styles = getOrderDetailStyles(isDarkMode);

  // If order is missing, show fallback UI
  if (!currentOrder) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Order data not available</Text>
      </View>
    );
  }

  // Open edit modal
  const handleEdit = () => {
    setShowEdit(true);
  };

  // Handle order update logic
  const handleUpdateOrder = async (updatedOrder) => {
    try {
      const token = await AsyncStorage.getItem('token');

      // Construct updated order payload
      const fullUpdate = {
        ...updatedOrder,
        products: currentOrder.products.map(p => ({
          product: p.product._id,
          quantity: p.quantity,
        })),
        total: currentOrder.total,
      };

      // ✅ Send update request
      const res = await fetch(`${API_BASE_URL}/orders/${updatedOrder._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fullUpdate),
      });

      const result = await res.json();

      if (!res.ok) {
        Alert.alert('Update Failed', result.message || 'Please try again.');
        return;
      }

      // ✅ Refresh updated order from server
      const refresh = await fetch(`${API_BASE_URL}/orders/${updatedOrder._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const latest = await refresh.json();

      if (!refresh.ok || !latest.data) {
        Alert.alert('Reload Failed', 'Order updated, but failed to reload new data.');
        return;
      }

      setShowEdit(false);

      // Show success message and navigate back to Orders screen
      Alert.alert('Success', 'Order has been updated successfully.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('AppTabs', {
              screen: 'Orders',
              params: { highlightOrderId: latest.data._id },
            });
          },
        },
      ]);
    } catch (err) {
      console.error('❌ Update error:', err);
      Alert.alert('Network Error', 'Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top header bar with title */}
      <HeaderBar title="Order Details" />

      {/* Page title */}
      <View style={styles.titleWrapper}>
        <Text style={[styles.titleText, { color: isDarkMode ? '#fff' : '#111' }]}>
          Order Details
        </Text>
      </View>

      {/* Main content section */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Show order details */}
        <OrderDetailCard order={currentOrder} isDarkMode={isDarkMode} />

        {/* Edit button */}
        <View style={styles.iconButtonRow}>
          <TouchableOpacity onPress={handleEdit}>
            <Ionicons name="create-outline" size={28} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit order modal */}
      <EditOrderModal
        visible={showEdit}
        onClose={() => setShowEdit(false)}
        order={currentOrder}
        isDarkMode={isDarkMode}
        onSubmit={handleUpdateOrder}
      />
    </View>
  );
}
