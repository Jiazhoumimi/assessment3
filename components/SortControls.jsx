// components/SortControls.jsx

import React from 'react';
import { View, Text } from 'react-native';
import SortChipButton from './SortChipButton';

export default function SortControls({ sortOrder, setSortOrder, isDarkMode }) {
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 6, marginBottom: 6 }}>
      <Text
        style={{
          color: isDarkMode ? '#aaa' : '#444',
          fontSize: 13,
          fontWeight: '400',
          marginBottom: 8,
        }}
      >
        Sort by price
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <SortChipButton
          icon="up"
          title="Low"
          isSelected={sortOrder === 'price'}
          onPress={() => setSortOrder('price')}
        />
        <SortChipButton
          icon="down"
          title="High"
          isSelected={sortOrder === '-price'}
          onPress={() => setSortOrder('-price')}
        />
      </View>
    </View>
  );
}
