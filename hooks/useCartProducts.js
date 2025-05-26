// useCartProducts.js
// This hook retrieves selected product data for displaying in cart.
// It handles loading state and re-fetching when the ID list changes.

import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://n11501910.ifn666.com/assessment02/products';

export default function useCartProducts(productIds = []) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔁 Fetch product details for all IDs in the list
  const fetchCartProducts = async () => {
    if (!productIds || productIds.length === 0) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);

      // 🧾 Send parallel requests for each product ID
      const promises = productIds.map(id =>
        axios.get(`${BASE_URL}/${id}`).then(res => res.data)
      );

      const results = await Promise.all(promises);
      setProducts(results); // ✅ Update state with all resolved product data
    } catch (err) {
      console.error('[useCartProducts] Fetch failed:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Re-fetch when the productIds array changes
  useEffect(() => {
    fetchCartProducts();
  }, [JSON.stringify(productIds)]); // ✅ Use JSON.stringify to detect array content change

  return {
    products,
    loading,
    refetch: fetchCartProducts, // 📦 Manual trigger if needed
  };
}
