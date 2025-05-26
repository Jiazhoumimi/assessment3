// ProductScreen.jsx
// This screen is for browsing products.
// Users can filter by category, sort by price.

import React, { useState } from 'react';
import { View } from 'react-native';

import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';
import SortControls from '../components/SortControls';
import CategoryTabs from '../components/CategoryTabs';
import BrowseProductList from '../components/BrowseProductList';

import { useThemeMode } from '../context/ThemeContext';
import useProductBrowser from '../hooks/useProductBrowser';
import { getProductScreenStyles } from '../styles/ProductScreenStyles';

export default function ProductScreen() {
  const { isDarkMode } = useThemeMode(); // Get current theme mode
  const styles = getProductScreenStyles(isDarkMode);

  // Category options
  const categoryList = ['All', 'Electronics', 'Clothing', 'Home Appliances', 'Beauty'];

  // UI state for selected category, sort type, and search input
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Load products from backend using category and sort filters
  const {
    products,
    page,
    hasMore,
    loading,
    setPage,
    fetchProducts,
  } = useProductBrowser(
    selectedCategory === 'All' ? null : selectedCategory,
    sortOrder
  );

  // Filter products by search keyword (client-side)
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* App Header */}
      <HeaderBar />

      {/* Category filter */}
      <CategoryTabs
        categories={categoryList}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isDarkMode={isDarkMode}
      />

      {/* Search bar */}
      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      {/* Sort by price */}
      <SortControls
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        isDarkMode={isDarkMode}
      />

      {/* Product list */}
      <BrowseProductList
        products={filteredProducts}
        isDarkMode={isDarkMode}
        hasMore={hasMore}
        loading={loading}
        page={page}
        sortOrder={sortOrder}
        fetchMore={(nextPage) => fetchProducts(nextPage, sortOrder)}
      />
    </View>
  );
}
