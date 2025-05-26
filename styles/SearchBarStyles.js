// components/SearchBarStyles.js
import { StyleSheet } from 'react-native';

export const getSearchBarStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: isDarkMode ? '#333' : '#f4f4f4',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 48,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#333',
  },
});
