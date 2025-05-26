import { StyleSheet, Dimensions } from 'react-native';

export const getEditOrderModalStyles = (isDarkMode) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalWrapper: {
      width: Dimensions.get('window').width * 0.9,
      backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
      borderRadius: 16,
      padding: 24,
      maxHeight: '90%',
      elevation: 5,
    },
    card: {
      paddingBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
      color: isDarkMode ? '#fff' : '#111',
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      backgroundColor: isDarkMode ? '#2c2c2c' : '#f9f9f9',
      padding: 10,
      borderRadius: 8,
      marginBottom: 12,
      color: isDarkMode ? '#fff' : '#000',
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 12,
      marginBottom: 4,
      color: isDarkMode ? '#ccc' : '#555',
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#444' : '#ccc',
      borderRadius: 8,
      marginBottom: 20,
      height: 60,
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
      overflow: 'hidden',
    },
  });

/**
 * Extracted styles for DropDownPicker
 */
export const getDropdownStyles = (isDarkMode) => ({
  baseStyle: {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    borderColor: isDarkMode ? '#777' : '#ccc',
  },
  textStyle: {
    color: isDarkMode ? '#fff' : '#111',
    fontSize: 16,
    fontWeight: '500',
  },
  dropDownContainer: {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    borderColor: isDarkMode ? '#777' : '#ccc',
  },
  listItemLabel: {
    color: isDarkMode ? '#fff' : '#111',
  },
});
