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

export default function OrderDetailScreen() {
  const { isDarkMode } = useThemeMode();
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;
  const [currentOrder, setCurrentOrder] = useState(order);
  const [showEdit, setShowEdit] = useState(false);

  const styles = getOrderDetailStyles(isDarkMode);

  if (!currentOrder) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Order data not available</Text>
      </View>
    );
  }

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleUpdateOrder = async (updatedOrder) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const fullUpdate = {
        ...updatedOrder,
        products: currentOrder.products.map(p => ({
          product: p.product._id,
          quantity: p.quantity,
        })),
        total: currentOrder.total,
      };

      const res = await fetch(
        `https://n11501910.ifn666.com/assessment02/orders/${updatedOrder._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fullUpdate),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        Alert.alert('Update Failed', result.message || 'Please try again.');
        return;
      }

      const refresh = await fetch(`https://n11501910.ifn666.com/assessment02/orders/${updatedOrder._id}`, {
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
      <HeaderBar title="Order Details" />

      {/* Title Section */}
      <View style={styles.titleWrapper}>
        <Text style={[styles.titleText, { color: isDarkMode ? '#fff' : '#111' }]}>
          Order Details
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <OrderDetailCard order={currentOrder} isDarkMode={isDarkMode} />

        {/* Edit Icon */}
        <View style={styles.iconButtonRow}>
          <TouchableOpacity onPress={handleEdit}>
            <Ionicons name="create-outline" size={28} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Modal */}
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
