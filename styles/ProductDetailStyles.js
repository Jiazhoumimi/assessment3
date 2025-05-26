// styles/ProductDetailStyles.js
import { StyleSheet } from 'react-native';

export const getProductDetailStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#111' : '#fff',
      paddingHorizontal: 20,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 280,
      height: 280,
      borderRadius: 20,
      marginBottom: 20,
    },
    details: {
      alignItems: 'center',
      marginBottom: 20,
    },
    name: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 6,
      color: isDarkMode ? '#fff' : '#111',
    },
    category: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#666',
      marginBottom: 6,
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#f9c0d7' : '#111',
    },
    quantityWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    quantityBtn: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#fff' : '#111',
      borderRadius: 0,
      paddingHorizontal: 14,
      paddingVertical: 4,
    },
    quantityBtnText: {
      fontSize: 18,
      color: isDarkMode ? '#fff' : '#111',
    },
    quantityValue: {
      fontSize: 18,
      color: isDarkMode ? '#fff' : '#111',
      marginHorizontal: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      marginTop: 10,
    },
    cartButton: {
      width: 130,
      backgroundColor: isDarkMode ? '#d8135e' : '#111',
      paddingVertical: 12,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buyButton: {
      width: 130,
      backgroundColor: isDarkMode ? '#d8135e' : '#111',
      paddingVertical: 12,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartButtonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '500',
      marginLeft: 6,
    },
    buyButtonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '500',
      marginLeft: 6,
    },
  });
