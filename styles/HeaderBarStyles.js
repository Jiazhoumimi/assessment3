// styles/HeaderBarStyles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

export function getHeaderBarStyles(isDarkMode) {
  return StyleSheet.create({
    // Outer container of the header bar
    headerContainer: {
      width: Dimensions.get('window').width, // Full screen width
      backgroundColor: isDarkMode ? '#000' : '#fce3ef', // Dark or light pink
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'ios' ? 5 : 5, // Platform-specific top padding
    },

    // Horizontal layout: greeting text on left, setting icon on right
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    // Main greeting text (e.g. "Hello User name")
    helloText: {
      fontSize: 20,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#111', 
      marginBottom: 12,
    },

    // Secondary subtitle/question text (e.g. "Have a nice day")
    questionText: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#555',
    },

    // Settings icon wrapper padding (touch area)
    icon: {
      padding: 6,
    },
  });
}
