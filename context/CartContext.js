// CartContext.js
// Provides a global shopping cart with persistent storage.
// Allows users to keep cart items after logging out.


import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({}); // Format: { productId: quantity }

  // ✅ Load cart from AsyncStorage on first mount
  useEffect(() => {
    (async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cartItems');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (err) {
        console.error('❌ Failed to load cart from storage:', err);
      }
    })();
  }, []);

  // 💾 Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (err) {
        console.error('❌ Failed to save cart to storage:', err);
      }
    })();
  }, [cartItems]);

  // ✅ Add or merge items to cart
  const addToCart = (newItems) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      for (const [productId, quantity] of Object.entries(newItems)) {
        updated[productId] = (updated[productId] || 0) + quantity;
      }
      return updated;
    });
  };

  // ❌ Remove one item completely
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  // ✅ Update quantity for a single item (+ / -)
  const updateCartQuantity = (productId, delta) => {
    setCartItems((prev) => {
      const currentQty = prev[productId] || 0;
      const newQty = currentQty + delta;

      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }

      return {
        ...prev,
        [productId]: newQty,
      };
    });
  };

  // ✅ Clear all items from cart
  const clearCart = async () => {
    setCartItems({});
    await AsyncStorage.removeItem('cartItems'); // ✅ Also clear from storage
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook to use cart context
export const useCart = () => useContext(CartContext);
