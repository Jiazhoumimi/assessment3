// components/SearchBar.jsx
// have not implement yet

import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSearchBarStyles } from '../styles/SearchBarStyles.js';
import { useThemeMode } from '../context/ThemeContext'; // 

const SearchBar = ({ searchText, setSearchText }) => {
  const { isDarkMode } = useThemeMode(); // 
  const styles = getSearchBarStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={isDarkMode ? '#ccc' : '#999'}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
        value={searchText}
        onChangeText={setSearchText}
        returnKeyType="search"
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;
