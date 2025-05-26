import { StyleSheet } from 'react-native';

export function getProfileStyles(isDarkMode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#fff', // background
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      alignSelf: 'center',
      marginVertical: 20,
      color: isDarkMode ? '#f7abe2' : '#d8135e', // Account Text Color
    },
    avatarBlock: {
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginBottom: 10,
    },
    username: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#f7abe2' : '#d8135e', // Username Color rasberry
    },
    card: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
      borderRadius: 16,
      paddingVertical: 6,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 18,
      paddingHorizontal: 12,
    },
    label: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#888',
    },
    value: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: '500',
      marginTop: 2,
    },
    buttonWrapper: {
      marginTop: 10,
    },    
  });
}
