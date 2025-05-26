import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({}); // Format: { productId: quantity }

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

  // ✅ Remove an item completely
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  // ✅ Update quantity for one item (+ / -)
  const updateCartQuantity = (productId, delta) => {
    setCartItems((prev) => {
      const currentQty = prev[productId] || 0;
      const newQty = currentQty + delta;

      // If quantity is 0 or less, remove item
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

  // ✅ Clear all items
  const clearCart = () => setCartItems({});

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
