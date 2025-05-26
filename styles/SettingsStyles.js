// styles/SettingsStyles.js
import { StyleSheet } from 'react-native';

export const getSettingsStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#000' : '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 20,
    color: isDarkMode ? '#fff' : '#111',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#eee',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#111',
  },
  subLabel: {
    fontSize: 13,
    color: isDarkMode ? '#aaa' : '#888',
  },
  version: {
    fontSize: 14,
    color: isDarkMode ? '#ccc' : '#555',
  },
});
