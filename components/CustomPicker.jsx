// components/CustomPicker.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CustomPicker({ label, selectedValue, onValueChange, options, isDarkMode }) {
  const styles = getStyles(isDarkMode);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          itemStyle={styles.item}
          dropdownIconColor={isDarkMode ? '#fff' : '#111'}
        >
          {options.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

function getStyles(isDarkMode) {
  return StyleSheet.create({
    label: {
      fontSize: 14,
      marginBottom: 4,
      color: isDarkMode ? '#aaa' : '#555',
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
      marginBottom: 20,
      height: 48,
      justifyContent: 'center',
      overflow: 'hidden',
    },
    picker: {
      height: 48,
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#111',
    },
    item: {
      fontSize: 16,
      fontWeight: '500',
      color: isDarkMode ? '#fff' : '#111',
    },
  });
}
