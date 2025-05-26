// styles/BrowseProductListStyles.js
import { StyleSheet } from 'react-native';

export const getBrowseProductListStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingBottom: 40,
    },
    card: {
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
      minHeight: 120,
      backgroundColor: isDarkMode ? '#222' : '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3,
      justifyContent: 'space-between',
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#111',
    },
    price: {
      fontSize: 14,
      marginTop: 4,
      color: isDarkMode ? '#ccc' : '#555',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: isDarkMode ? '#888' : '#aaa',
    },
    addButton: {
      backgroundColor: '#000',
      borderRadius: 14,
      padding: 6,
      alignSelf: 'flex-end',
      marginTop: 10,
    },
  });
