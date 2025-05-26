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

  const renderItem = ({ item }) => {
    const card = (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Ionicons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    );

    if (item._id === targetProductId) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item._id })}>
          {card}
        </TouchableOpacity>
      );
    } else {
      return card;
    }
  };

  const handleEndReached = () => {
    if (!loading && hasMore) {
      fetchMore(page + 1, sortOrder);
    }
  };

  if (!products || products.length === 0) {
    return <Text style={styles.emptyText}>No products found.</Text>;
  }

  return (
    <FlatList
      data={products}
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
