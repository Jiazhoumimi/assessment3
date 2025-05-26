import { StyleSheet } from 'react-native';

export function getProductStyles(isDarkMode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#fdf6f0' : '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#6b4b3e' : '#3c2a1e',
      marginTop: 20,
      marginBottom: 10,
      textAlign: 'center',
    },
    list: {
      paddingHorizontal: 16,
    },
    card: {
      backgroundColor: isDarkMode ? '#fff8f1' : '#fff8f1',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    productName: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#362e24' : '#3c2a1e',
    },
    productCategory: {
      fontSize: 14,
      color: '#8d775e',
      marginTop: 4,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: '500',
      marginTop: 6,
      color: '#6d4c41',
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    quantityText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#6d4c41',
    },
  });
}