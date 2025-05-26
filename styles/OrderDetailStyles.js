import { StyleSheet } from 'react-native';

export const getOrderDetailStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#0f0f0f' : '#f8f8f8',
    },
    content: {
      padding: 24,
    },
    card: {
      backgroundColor: isDarkMode ? '#1c1c1e' : '#ffffff',
      borderRadius: 16,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? '#2a2a2a' : '#e0e0e0',
    },
    label: {
      fontWeight: '700',
      fontSize: 13,
      marginTop: 16,
      marginBottom: 4,
      color: isDarkMode ? '#bbb' : '#000',
      textTransform: 'uppercase',
    },
    value: {
      fontSize: 15,
      lineHeight: 22,
      color: isDarkMode ? '#f2f2f2' : '#222',
    },
    total: {
      fontSize: 20,
      fontWeight: '700',
      marginTop: 10,
      color: isDarkMode ? '#fff' : '#000',
    },
    text: {
      color: isDarkMode ? '#ccc' : '#444',
      textAlign: 'center',
      fontSize: 14,
      marginTop: 60,
      lineHeight: 22,
    },
    divider: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: isDarkMode ? '#333' : '#ddd',
      marginVertical: 20,
    },
    buttonWrapper: {
      marginTop: 10,
      alignItems: 'center',
    },
    titleWrapper: {
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    titleText: {
      fontSize: 20,
      fontWeight: '600',
    },
    iconButtonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 16,
    },
  });
