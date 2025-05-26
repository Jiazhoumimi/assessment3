// CategoryProductsScreen.jsx
// Quick view products by category (enter from home page)

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import BrowseProductList from '../components/BrowseProductList';
import SortControls from '../components/SortControls'; 
import useProductBrowser from '../hooks/useProductBrowser';
import { useThemeMode } from '../context/ThemeContext';
import { getCategoryScreenStyles } from '../styles/CategoryScreenStyles';

export default function CategoryProductsScreen({ route }) {
  const { isDarkMode } = useThemeMode();
  const styles = getCategoryScreenStyles(isDarkMode);

  const { category } = route.params || {};
  const [sortOrder, setSortOrder] = useState(null); 

  const {
    products,
    totalCount,
    page,
    hasMore,
    loading,
    fetchProducts,
  } = useProductBrowser(category, sortOrder);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#111' : '#fff' }}>
      <HeaderBar title={category} />

      {/* 🌸 Category Info Section */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Category: {category}</Text>
        <Text style={styles.infoSub}>{totalCount} products found</Text>
      </View>

      {/* 🔽 Sorting controls */}
      <SortControls
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        isDarkMode={isDarkMode}
      />

      {/* 🛍️ Product List */}
      <BrowseProductList
        products={products}
        isDarkMode={isDarkMode}
        page={page}
        hasMore={hasMore}
        loading={loading}
        fetchMore={fetchProducts}
        header={null}
      />
    </View>
  );
}
