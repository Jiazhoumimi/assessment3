// BrowseProductList.jsx
// This component is for ProductScreen - browsing products

import React from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { getBrowseProductListStyles } from '../styles/BrowseProductListStyles';

export default function BrowseProductList({
  products = [],
  isDarkMode,
  header = null,
  hasMore = false,
  loading = false,
  page = 1,
  fetchMore = () => {},
  sortOrder = null, // Accept sortOrder from parent
}) {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const styles = getBrowseProductListStyles(isDarkMode);

  const targetProductId = '6810eb982f5b9676d765d0fb';

  const handleAddToCart = (item) => {
    addToCart({ [item._id]: 1 });
    Alert.alert('Added to Cart', `${item.name} has been added to your bag.`);
  };

  // Render single product card
  const renderItem = ({ item }) => {
    const card = (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    );

    if (item._id === targetProductId) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', { id: item._id })}
          activeOpacity={0.7}
        >
          {card}
        </TouchableOpacity>
      );
    } else {
      return card;
    }
  };

  // Infinite scroll: load next page
  const handleEndReached = () => {
    if (!loading && hasMore) {
      fetchMore(page + 1, sortOrder);
    }
  };

  // Handle empty result
  if (!products || products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={Array.from(new Map(products.map(p => [p._id, p])).values())} // ✅ remove duplicates by ID
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListHeaderComponent={header}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="small"
            color="#ff69b4"
            style={{ marginVertical: 20 }}
          />
        ) : null
      }
      onEndReachedThreshold={0.2}
      onEndReached={handleEndReached}
      extraData={sortOrder} // Force FlatList to re-render when sortOrder changes
    />
  );
}
