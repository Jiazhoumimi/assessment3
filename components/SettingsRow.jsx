import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function SettingsRow({
  icon,
  label,
  subText,
  action,
  rightComponent = null,
  styles,
}) {
  return (
    <TouchableOpacity style={styles.itemRow} onPress={action} activeOpacity={0.7}>
      <View style={styles.rowLeft}>
        {icon}
        <View>
          <Text style={styles.label}>{label}</Text>
          {subText && <Text style={styles.subLabel}>{subText}</Text>}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );
}
