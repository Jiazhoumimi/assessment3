import { StyleSheet } from 'react-native';

export const getCartStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111' : '#fff',
      paddingBottom: 12,
    },
    titleWrapper: {
      paddingHorizontal: 16,
      paddingTop: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#111',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: isDarkMode ? '#888' : '#666',
    },
  });
