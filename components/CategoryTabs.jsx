// CategoryTabs.jsx
// this component is category tabs for productscreen for browsing.

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getCategoryTabStyles } from '../styles/CategoryTabsStyles';

export default function CategoryTabs({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  isDarkMode,
}) {
  const styles = getCategoryTabStyles(selectedCategory, isDarkMode);

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8, color: isDarkMode ? '#fff' : '#111' }}>
        CHOOSE CATEGORY
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={styles.tab(category)}
          >
            <Text style={styles.tabText(category)}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
