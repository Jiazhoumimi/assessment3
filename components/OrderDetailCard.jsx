import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { getOrderDetailStyles } from '../styles/OrderDetailStyles';
import { Ionicons } from '@expo/vector-icons'; // ✅ Icon
import * as Clipboard from 'expo-clipboard';   // ✅ Clipboard API

export default function OrderDetailCard({ order, isDarkMode }) {
  const styles = getOrderDetailStyles(isDarkMode);

  if (!order) {
    return (
      <View style={styles.card}>
        <Text style={styles.label}>Order data is missing.</Text>
      </View>
    );
  }

  const {
    _id,
    createdAt,
    updatedAt,
    products,
    status,
    total,
    shippingAddress,
    user,
  } = order;

  const handleCopy = async () => {
    if (_id) {
      await Clipboard.setStringAsync(_id);
      Alert.alert('Copied!', 'Order ID has been copied to clipboard.');
    }
  };

  return (
    <View style={styles.card}>
      {/* 🆔 Order ID with Copy Icon */}
      <Text style={styles.label}>Order ID:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Text style={[styles.value, { flex: 1 }]} numberOfLines={1}>{_id || 'N/A'}</Text>
        {_id && (
          <TouchableOpacity onPress={handleCopy}>
            <Ionicons
              name="copy-outline"
              size={20}
              color={isDarkMode ? '#ccc' : '#555'}
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.label}>Created at:</Text>
      <Text style={styles.value}>
        {createdAt ? new Date(createdAt).toLocaleString() : 'N/A'}
      </Text>

      <Text style={styles.label}>Updated at:</Text>
      <Text style={styles.value}>
        {updatedAt ? new Date(updatedAt).toLocaleString() : 'N/A'}
      </Text>

      <Text style={styles.label}>Products:</Text>
      <Text style={styles.value}>
        {Array.isArray(products)
          ? products.map(p => `• ${p.product?.name || 'Unnamed'} x${p.quantity}`).join('\n')
          : 'No product information'}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{status || 'N/A'}</Text>

      <Text style={styles.label}>Shipping Address:</Text>
      <Text style={styles.value}>
        {shippingAddress
          ? `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}, ${shippingAddress.country}`
          : 'N/A'}
      </Text>

      <Text style={styles.label}>Contact:</Text>
      <Text style={styles.value}>{user?.email || 'N/A'}</Text>

      <Text style={styles.label}>Total:</Text>
      <Text style={styles.total}>${total?.toFixed(2) || '0.00'}</Text>
    </View>
  );
}
