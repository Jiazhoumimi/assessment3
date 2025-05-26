import { StyleSheet } from 'react-native';

export const getCartStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111' : '#fff',
      padding: 16,
    },
    item: {
      backgroundColor: isDarkMode ? '#1c1c1e' : '#f4f4f4',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#000',
    },
    price: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#444',
      marginTop: 4,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    quantityButton: {
      backgroundColor: isDarkMode ? '#333' : '#ddd',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 8,
      marginHorizontal: 6,
    },
    quantityText: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 16,
    },
    totalBar: {
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#333' : '#ddd',
      paddingTop: 16,
      marginTop: 16,
    },
    totalText: {
      textAlign: 'right',
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#000',
    },
    checkoutButton: {
      backgroundColor: '#d8135e',
      padding: 14,
      borderRadius: 12,
      marginTop: 16,
      alignItems: 'center',
    },
    checkoutText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    emptyText: {
      color: isDarkMode ? '#888' : '#666',
      textAlign: 'center',
      marginTop: 40,
    },
  });
