// components/OrderSummaryBar.jsx
// this is in the cart page, for caculating the total price.

import React from 'react';
import { View, Text } from 'react-native';
import { getOrderSummaryBarStyles } from '../styles/OrderSummaryBarStyles';
import CustomButton from './CustomButton';

export default function OrderSummaryBar({
  total,
  quantity,
  onSubmit,
  isDarkMode,
  buttonLabel = 'CHECKOUT', // Default button text
}) {
  const styles = getOrderSummaryBarStyles(isDarkMode);

  return (
    <View style={styles.summaryBox}>
      {/* Summary row: subtotal & total amount */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.subtotalText}>
          Subtotal ({quantity} items)
        </Text>
        <Text style={styles.totalText}>
          Total: ${total.toFixed(2)}
        </Text>
      </View>

      {/* Bottom right button */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
        <CustomButton
          title={buttonLabel} // Now dynamic
          onPress={onSubmit}
          width={120}
          color="#d8135e"
          textColor="#fff"
        />
      </View>
    </View>
  );
}
