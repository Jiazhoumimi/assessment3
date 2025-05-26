// styles/CategoryScreenStyles.js
import { StyleSheet } from 'react-native';

export function getCategoryScreenStyles(isDarkMode) {
  return StyleSheet.create({
    infoBox: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 16,
      marginBottom: 10,
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#d87a9d', // Light pink title
      marginTop: 4,
      marginBottom: 4,
    },
    infoSub: {
      fontSize: 14,
      color: isDarkMode ? '#aaa' : '#888', // Neutral gray subtext
    },
  });
}
