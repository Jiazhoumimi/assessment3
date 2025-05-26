import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomButton from '../components/CustomButton';
import { useThemeMode } from '../context/ThemeContext';
import { getOrderDetailStyles } from '../styles/OrderDetailStyles';

export default function GetOrderByIdScreen() {
  const { isDarkMode } = useThemeMode();
  const styles = getOrderDetailStyles(isDarkMode);
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchOrder = async () => {
    if (!orderId.trim()) {
      Alert.alert('Please enter a valid Order ID.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://n11501910.ifn666.com/assessment02/orders/${orderId}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        Alert.alert('Order not found', json.message || 'Invalid Order ID');
        setOrder(null);
      } else {
        setOrder(json.data);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch order');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Get Order By ID" />

      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          style={styleSheet.input}
          placeholder="Enter Order ID"
          placeholderTextColor={isDarkMode ? '#777' : '#999'}
          value={orderId}
          onChangeText={setOrderId}
        />

        <CustomButton title="GET ORDER" onPress={handleFetchOrder} />

        {loading && (
          <ActivityIndicator size="large" color="#d8135e" style={{ marginTop: 20 }} />
        )}

        {order && (
          <View style={styles.card}>
            <Text style={styles.label}>Order ID:</Text>
            <Text style={styles.value}>{order._id}</Text>

            <Text style={styles.label}>Created:</Text>
            <Text style={styles.value}>{new Date(order.createdAt).toLocaleString()}</Text>

            <Text style={styles.label}>Updated:</Text>
            <Text style={styles.value}>{new Date(order.updatedAt).toLocaleString()}</Text>

            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{order.status}</Text>

            <Text style={styles.label}>Total:</Text>
            <Text style={styles.total}>${order.total}</Text>

            <Text style={styles.label}>Shipping Address:</Text>
            <Text style={styles.value}>
              {order.shippingAddress?.street}, {order.shippingAddress?.city},{' '}
              {order.shippingAddress?.state} {order.shippingAddress?.postalCode},{' '}
              {order.shippingAddress?.country}
            </Text>

            <Text style={styles.label}>Products:</Text>
            {order.products?.length > 0 ? (
              order.products.map((p) => (
                <Text key={p._id} style={styles.value}>
                  • {p.product?.name || 'Unnamed'} x{p.quantity}
                </Text>
              ))
            ) : (
              <Text style={styles.value}>No products found.</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styleSheet = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    color: '#000',
    backgroundColor: '#fff',
  },
});
