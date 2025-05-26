// components/OrderItemCard.jsx
// this is imported by ProductListContainer

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function OrderItemCard({
  item,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
  isDarkMode, 
}) {
  const textColor = isDarkMode ? '#fff' : '#000';
  const subTextColor = isDarkMode ? '#ccc' : '#555';
  const borderColor = isDarkMode ? '#333' : '#ccc';

  return (
    <View style={{
      flexDirection: 'row',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    }}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/60' }}
        style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', fontSize: 14, color: textColor }}>{item.name}</Text>
        <Text style={{ marginVertical: 4, color: subTextColor }}>${item.price.toFixed(2)}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: subTextColor }}>Qty: </Text>
          <TouchableOpacity onPress={onDecrement}>
            <Text style={{ fontSize: 18, paddingHorizontal: 10, color: textColor }}>➖</Text>
          </TouchableOpacity>
          <Text style={{ color: textColor }}>{quantity}</Text>
          <TouchableOpacity onPress={onIncrement}>
            <Text style={{ fontSize: 18, paddingHorizontal: 10, color: textColor }}>➕</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={{ fontSize: 12, color: subTextColor, marginTop: 6 }}>♡ Move to wish list</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ padding: 4 }} onPress={onRemove}>
        <Text style={{ fontSize: 18, color: textColor }}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}
