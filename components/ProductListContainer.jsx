// ProductListContainer.jsx
// This is a Sephora-style product list component designed specifically for the CartScreen.
// For Cart checkout pages 

import React from 'react';
import { FlatList } from 'react-native';
import OrderItemCard from './OrderItemCard';

export default function ProductListContainer({
  products,              // Array of product objects in the cart
  quantities,            // Object: { productId: quantity }
  updateQuantity,        // Function to increase or decrease product quantity
  isDarkMode,            // Boolean: true for dark mode, false for light mode
  hasMore,               // Boolean: true if more products can be loaded (for pagination)
  page,                  // Current page number
  setPage,               // Setter for page number
  fetchProducts,         // Function to fetch more products when reaching list end
  loading,               // Boolean: true if data is loading
  removeItem,            // Function to remove a product from the cart
}) {
  // When user scrolls near the end, fetch next page if available
  const handleEndReached = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  // Render each product as a styled card with controls
  const renderItem = ({ item }) => (
    <OrderItemCard
      item={item}
      quantity={quantities[item._id] || 0}
      onIncrement={() => updateQuantity(item._id, 1)}
      onDecrement={() => updateQuantity(item._id, -1)}
      onRemove={() => removeItem && removeItem(item._id)}
      isDarkMode={isDarkMode}
    />
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 100 }}
      onEndReachedThreshold={0.2}
      onEndReached={handleEndReached}
    />
  );
}
