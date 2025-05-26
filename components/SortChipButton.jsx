import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';

export default function SortChipButton({ icon, title, isSelected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: isSelected ? '#f9c0d7' : '#f0f0f0',
          borderColor: isSelected ? '#f9c0d7' : '#ccc',
        },
      ]}
    >
      <View style={styles.inner}>
        {icon === 'up' ? (
          <ArrowUp size={16} color={isSelected ? '#111' : '#666'} />
        ) : (
          <ArrowDown size={16} color={isSelected ? '#111' : '#666'} />
        )}
        <Text
          style={[
            styles.text,
            { color: isSelected ? '#111' : '#666' },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
