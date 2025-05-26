import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';
import SortControls from '../components/SortControls';
import CategoryTabs from '../components/CategoryTabs';
import BrowseProductList from '../components/BrowseProductList';

import { useThemeMode } from '../context/ThemeContext';
import useProductOrder from '../hooks/useProductOrder';
import { getProductScreenStyles } from '../styles/ProductScreenStyles';

export default function ProductScreen() {
  const { isDarkMode } = useThemeMode();
  const styles = getProductScreenStyles(isDarkMode);
  const navigation = useNavigation();

  const categoryList = ['All', 'Electronics', 'Clothing', 'Home Appliances', 'Beauty'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState(null);
  const [searchText, setSearchText] = useState('');

  const {
    products,
    page,
    hasMore,
    loading,
    setPage,
    fetchProducts,
  } = useProductOrder(selectedCategory === 'All' ? null : selectedCategory, sortOrder);

  // ✅ When category or sort changes, reload from page 1
  useEffect(() => {
    fetchProducts(1, sortOrder);
  }, [selectedCategory, sortOrder]);

  // ✅ Filter product list using search text
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <HeaderBar />

      <CategoryTabs
        categories={categoryList}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isDarkMode={isDarkMode}
      />

      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      <SortControls
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        isDarkMode={isDarkMode}
      />

      <BrowseProductList
        products={filteredProducts}
        isDarkMode={isDarkMode}
        hasMore={hasMore}
        loading={loading}
        page={page}
        sortOrder={sortOrder} // pass sortOrder to FlatList component
        fetchMore={(nextPage) => fetchProducts(nextPage, sortOrder)} // sorting respected in pagination
      />
    </View>
  );
}
