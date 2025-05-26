import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function CustomButton({
  title,
  onPress,
  color = '#000',
  textColor = '#fff',
  width, // 
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: color,
          width: width || screenWidth * 0.7, // 
        },
      ]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
