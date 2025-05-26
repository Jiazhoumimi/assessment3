import React, { useEffect, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function CategorySelectDropdown({ selectedCategory, setSelectedCategory, isDarkMode }) {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const data = [
      { key: '1', value: 'All' },
      { key: '2', value: 'Home Appliances' },
      { key: '3', value: 'Electronics' },
      { key: '4', value: 'Clothing' },
      { key: '5', value: 'Beauty' },
    ];
    setCategoryData(data);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
    >
      <SelectList
        setSelected={setSelectedCategory}
        data={categoryData}
        save="value"
        defaultOption={{ key: '1', value: 'All' }}
        search={false}
        boxStyles={[
          styles.box,
          {
            backgroundColor: isDarkMode ? '#222' : '#fff',
            borderColor: isDarkMode ? '#999' : '#000',
          },
        ]}
        inputStyles={{
          color: isDarkMode ? '#fff' : '#000',
          fontWeight: '600',
          textTransform: 'uppercase', // display uppercase
        }}
        dropdownStyles={{
          backgroundColor: isDarkMode ? '#333' : '#fff',
          borderColor: isDarkMode ? '#999' : '#000',
        }}
        dropdownItemStyles={{
          borderBottomWidth: 0.5,
          borderColor: isDarkMode ? '#555' : '#ccc',
        }}
        dropdownTextStyles={{
          textTransform: 'uppercase', // visually uppercase
          fontWeight: '500',
          color: isDarkMode ? '#fff' : '#000',
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
    zIndex: 9999,
  },
  box: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
  },
});
