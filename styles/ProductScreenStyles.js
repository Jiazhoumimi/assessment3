import { StyleSheet } from 'react-native';

export const getProductScreenStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111' : '#fff',
    },
  });
