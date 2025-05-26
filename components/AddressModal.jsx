import React from 'react';
import {
  Modal,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AddressForm from './AddressForm';
import { getEditOrderModalStyles } from '../styles/EditOrderModalStyles';

export default function AddressModal({
  visible,
  onSubmit,
  onCancel,
  address,
  setAddress,
  isDarkMode,
}) {
  const styles = getEditOrderModalStyles(isDarkMode);

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
                <AddressForm
                  address={address}
                  setAddress={setAddress}
                  onSubmit={onSubmit}
                  onCancel={onCancel}
                  isDarkMode={isDarkMode}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
