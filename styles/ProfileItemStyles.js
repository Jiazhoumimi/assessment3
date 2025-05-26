import { StyleSheet } from 'react-native';

export const getProfileItemStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#444' : '#eee',
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
    color: isDarkMode ? '#fff' : '#111',
  },
});
