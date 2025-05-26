import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import {
  getEditOrderModalStyles,
  getDropdownStyles,
} from '../styles/EditOrderModalStyles';

const AU_STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'];

export default function EditOrderModal({ visible, onClose, order, isDarkMode, onSubmit }) {
  const styles = getEditOrderModalStyles(isDarkMode);
  const dropdownStyles = getDropdownStyles(isDarkMode);
  const navigation = useNavigation();

  const [status, setStatus] = useState(order.status || 'Pending');
  const [address, setAddress] = useState(order.shippingAddress || {});
  const [loading, setLoading] = useState(false);

  const [stateOpen, setStateOpen] = useState(false);
  const [stateValue, setStateValue] = useState(order.shippingAddress?.state || AU_STATES[0]);
  const [stateItems, setStateItems] = useState(
    AU_STATES.map((s) => ({ label: s, value: s }))
  );

  const [statusOpen, setStatusOpen] = useState(false);
  const statusItems = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Paid', value: 'Paid' },
    { label: 'Shipped', value: 'Shipped' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Canceled', value: 'Canceled' },
  ];

  useEffect(() => {
    setAddress((prev) => ({ ...prev, state: stateValue }));
  }, [stateValue]);

  const handleSubmit = async () => {
    if (!address.street || !address.city || !address.postalCode) {
      Alert.alert('Incomplete Address', 'Please fill in full address.');
      return;
    }

    const updatedOrder = {
      _id: order._id,
      shippingAddress: address,
      status,
    };

    try {
      setLoading(true);
      await onSubmit(updatedOrder);
      setLoading(false);
      onClose();
      navigation.navigate('AppTabs', { screen: 'Orders' });
    } catch (err) {
      setLoading(false);
      Alert.alert('Update Failed', 'Please try again.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalWrapper}
          >
            <View style={styles.cardWrapper}>
              <View style={styles.card}>
                <Text style={styles.title}>Edit Order</Text>

                {['street', 'city', 'postalCode', 'country'].map((field) => (
                  <TextInput
                    key={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={address[field] || ''}
                    onChangeText={(val) => setAddress({ ...address, [field]: val })}
                    placeholderTextColor={isDarkMode ? '#777' : '#999'}
                    style={styles.input}
                  />
                ))}

                <Text style={styles.label}>State</Text>
                <View style={{ zIndex: 2000 }}>
                  <DropDownPicker
                    open={stateOpen}
                    value={stateValue}
                    items={stateItems}
                    setOpen={setStateOpen}
                    setValue={setStateValue}
                    setItems={setStateItems}
                    placeholder="Select State"
                    style={dropdownStyles.baseStyle}
                    textStyle={dropdownStyles.textStyle}
                    dropDownContainerStyle={dropdownStyles.dropDownContainer}
                    listItemLabelStyle={dropdownStyles.listItemLabel}
                    theme={isDarkMode ? 'DARK' : 'LIGHT'}
                  />
                </View>

                <Text style={styles.label}>Status</Text>
                <View style={{ zIndex: 1000 }}>
                  <DropDownPicker
                    open={statusOpen}
                    value={status}
                    items={statusItems}
                    setOpen={setStatusOpen}
                    setValue={setStatus}
                    setItems={() => {}}
                    placeholder="Select Status"
                    style={dropdownStyles.baseStyle}
                    textStyle={dropdownStyles.textStyle}
                    dropDownContainerStyle={dropdownStyles.dropDownContainer}
                    listItemLabelStyle={dropdownStyles.listItemLabel}
                    theme={isDarkMode ? 'DARK' : 'LIGHT'}
                  />
                </View>

                <CustomButton
                  title={loading ? 'Saving...' : 'Save Changes'}
                  onPress={handleSubmit}
                  color="#d8135e"
                  textColor="#fff"
                  disabled={loading}
                />
                <CustomButton
                  title="Cancel"
                  onPress={onClose}
                  color="#fff"
                  textColor="#333"
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
