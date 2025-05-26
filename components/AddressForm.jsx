// fill the address when checking out

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from './CustomButton';
import { getDropdownStyles } from '../styles/EditOrderModalStyles';

const AU_REGIONS = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'];

export default function AddressForm({
  address,
  setAddress,
  onSubmit,
  onCancel,
  isDarkMode,
}) {
  const styles = getFormStyles(isDarkMode);
  const dropdownStyles = getDropdownStyles(isDarkMode);

  const [stateOpen, setStateOpen] = useState(false);
  const [stateItems, setStateItems] = useState(
    AU_REGIONS.map((region) => ({ label: region, value: region }))
  );

  useEffect(() => {
    if (!address.state) {
      setAddress((prev) => ({ ...prev, state: AU_REGIONS[0] }));
    }
  }, []);

  return (
    <View>
      <Text style={styles.title}>Confirm Address</Text>

      {/* Editable Inputs */}
      {['street', 'city', 'postalCode'].map((field) => (
        <TextInput
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={address[field] || ''}
          onChangeText={(val) => setAddress({ ...address, [field]: val })}
          placeholderTextColor={isDarkMode ? '#777' : '#999'}
          style={styles.input}
        />
      ))}

      {/* State DropDown */}
      <Text style={styles.label}>State</Text>
      <View style={{ zIndex: 2000 }}>
        <DropDownPicker
          open={stateOpen}
          value={address.state}
          items={stateItems}
          setOpen={setStateOpen}
          setValue={(callback) => {
            const value = callback(address.state);
            setAddress({ ...address, state: value });
          }}
          setItems={setStateItems}
          placeholder="Select State"
          style={dropdownStyles.baseStyle}
          textStyle={dropdownStyles.textStyle}
          dropDownContainerStyle={dropdownStyles.dropDownContainer}
          listItemLabelStyle={dropdownStyles.listItemLabel}
          theme={isDarkMode ? 'DARK' : 'LIGHT'}
        />
      </View>

      {/* Country (read-only) */}
      <Text style={styles.label}>Country</Text>
      <TextInput
        value="Australia"
        editable={false}
        style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }]}
      />

      <CustomButton title="Submit" onPress={onSubmit} color="#d8135e" textColor="#fff" />
      <CustomButton title="Cancel" onPress={onCancel} color="#fff" textColor="#333" />
    </View>
  );
}

function getFormStyles(isDarkMode) {
  return StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
      color: isDarkMode ? '#fff' : '#111',
      textAlign: 'center',
    },
    label: {
      fontSize: 14,
      color: isDarkMode ? '#aaa' : '#555',
      marginBottom: 4,
      marginTop: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#555' : '#ccc',
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#111',
      backgroundColor: isDarkMode ? '#333' : '#fafafa',
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
}