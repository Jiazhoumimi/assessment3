// styles/OrdersScreenStyles.js
import { StyleSheet } from 'react-native';

export default function styles(isDarkMode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111' : '#fff',
      padding: 16,
    },
    card: {
      backgroundColor: isDarkMode ? '#1e1e1e' : '#eee',
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 3,
    },
    timeText: {
      fontSize: 13,
      color: '#888',
      marginBottom: 6,
    },
    productNames: {
      fontSize: 14,
      fontWeight: '500',
      color: isDarkMode ? '#fff' : '#111',
      marginTop: 4,
      marginBottom: 4,
      whiteSpace: 'pre-line',
    },
    metaText: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#333',
      marginBottom: 3,
      marginTop: 3,
    },
    totalText: {
      fontSize: 14,
      fontWeight: '500',
      color: isDarkMode ? '#fff' : '#000',
      marginTop: 3,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
        color: isDarkMode ? '#fff' : '#000',
      },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      marginTop: 60,
      color: isDarkMode ? '#ccc' : '#666',
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: isDarkMode ? '#444' : '#aaa',
        marginVertical: 12,
      },
  });
}