import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import styles from '../styles/OrdersScreenStyles';

export default function OrderCard({ order, isDarkMode, isHighlighted, onPress }) {
  const cardStyle = {
    ...styles(isDarkMode).card,
    backgroundColor: isHighlighted ? (isDarkMode ? '#553344' : '#ffe4eb') : styles(isDarkMode).card.backgroundColor,
    borderColor: isHighlighted ? '#ff69b4' : 'transparent',
    borderWidth: isHighlighted ? 2 : 0,
  };

  return (
    <TouchableOpacity onPress={onPress} style={cardStyle}>
      <Text style={styles(isDarkMode).timeText}>
        {order.products.length} items · {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
      </Text>

      <Text style={styles(isDarkMode).productNames}>
        PRODUCTS:
        {"\n" + order.products.map((p) => "\u2022 " + (p.product?.name || 'Unnamed')).join("\n")}
      </Text>

      <View style={styles(isDarkMode).divider} />

      <Text style={styles(isDarkMode).metaText}>
        📅 ORDER DATE: {new Date(order.createdAt).toLocaleString()}
      </Text>

      <Text style={styles(isDarkMode).totalText}>
        💰 TOTAL: ${order.total}
      </Text>

      <Text style={styles(isDarkMode).statusText}>
        📦 STATUS: {order.status || 'pending'}
      </Text>
    </TouchableOpacity>
  );
}
