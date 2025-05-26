import { StyleSheet } from 'react-native';

export const getOrderSummaryBarStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#111' : '#fff',
  },

  summaryBox: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: isDarkMode ? '#fcd7f7' : '#fff',
  },

  subtotalText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,        
    color: isDarkMode ? '#111' : '#555',
  },

  totalText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,        
    color: '#111',
    textAlign: 'right',
  },

  checkoutButton: {
    width: 140,
    backgroundColor: '#d8135e',
    padding: 12,
    borderRadius: 10,
  },

  checkoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
