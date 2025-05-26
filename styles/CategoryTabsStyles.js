// styles/CategoryTabsStyles.js
import { StyleSheet } from 'react-native';

export const getCategoryTabStyles = (selectedCategory, isDarkMode) =>
  StyleSheet.create({
    tab: (category) => ({
      paddingVertical: 8,
      paddingHorizontal: 18,
      borderRadius: 999, 
      marginRight: 1,
      backgroundColor:
        selectedCategory === category
          ? '#111' // Active
          : isDarkMode
          ? '#333'
          : '#eee',
    }),
    tabText: (category) => ({
      fontSize: 14,
      fontWeight: '600',
      color:
        selectedCategory === category
          ? '#fff'
          : isDarkMode
          ? '#ccc'
          : '#333',
    }),
  });
