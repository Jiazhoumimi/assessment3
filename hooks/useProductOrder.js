import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const BASE_URL = 'https://n11501910.ifn666.com/assessment02/products';

// Main hook to fetch products and manage quantities
export default function useProductOrder(selectedCategory, limit = 6) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const debounceTimeout = useRef(null);
  const requestLock = useRef(false); // 🔒 Prevent duplicate requests

  // Fetch product list from backend with pagination and optional category filter
  const fetchProducts = async (targetPage = 1) => {
    if (requestLock.current || loading) return;

    try {
      requestLock.current = true;
      setLoading(true);

      const params = { page: targetPage, limit }; // Dynamic limit
      if (selectedCategory) params.category = selectedCategory;

      console.log(`🌹 [Order] Fetching products | category=${selectedCategory} | page=${targetPage}`);
      const res = await axios.get(BASE_URL, { params });

      const newProducts = res.data.products || [];
      const isFirstPage = targetPage === 1;

      setProducts((prev) => (isFirstPage ? newProducts : [...prev, ...newProducts]));
      setPage(targetPage);
      setHasMore(targetPage < res.data.totalPages);
    } catch (err) {
      console.error('[Order] Failed to fetch products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
      requestLock.current = false;
    }
  };

  // Update the quantity of a product by delta (+1 / -1)
  const updateQuantity = (productId, delta) => {
    setQuantities((prev) => {
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

  // ✅ Recalculate total price when quantities or product list change
  useEffect(() => {
    let totalSum = 0;
    for (const [productId, qty] of Object.entries(quantities)) {
      const product = products.find((p) => p._id === productId);
      if (product) {
        totalSum += product.price * qty;
      }
    }
    setTotal(totalSum);
  }, [quantities, products]);

  // ✅ Debounced refetch when category changes
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchProducts(1);
      setQuantities({});
    }, 600);

    return () => clearTimeout(debounceTimeout.current);
  }, [selectedCategory]);

  // ✅ Initial fetch on mount
  useEffect(() => {
    fetchProducts(1);
  }, []);

  return {
    products,
    quantities,
    total,
    page,
    hasMore,
    loading,
    setPage,
    fetchProducts,
    updateQuantity,
  };
}
