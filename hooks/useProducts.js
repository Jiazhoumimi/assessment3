import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const BASE_URL = 'https://n11501910.ifn666.com/assessment02/products';

export default function useProducts(selectedCategory) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const debounceTimeout = useRef(null);
  const requestLock = useRef(false); // ✅ prevent overlapping requests

  // ✅ Fetch products with category and page, with request lock
  const fetchProducts = async (targetPage = 1) => {
    if (requestLock.current) return;

    try {
      requestLock.current = true;
      setLoading(true);

      const params = {
        page: targetPage,
        limit: 6,
      };
      if (selectedCategory) {
        params.category = selectedCategory;
      }

      console.log(`📦 Fetching products | category=${selectedCategory} | page=${targetPage}`);
      const res = await axios.get(BASE_URL, { params });

      const newProducts = res.data.products || [];
      const isFirstPage = targetPage === 1;

      setProducts((prev) => (isFirstPage ? newProducts : [...prev, ...newProducts]));
      setPage(targetPage);
      setHasMore(targetPage < res.data.totalPages);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err);
      setProducts([]);
    } finally {
      requestLock.current = false;
      setLoading(false);
    }
  };

  // ✅ Update quantity
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

  // ✅ Recalculate total
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

  // ✅ Debounced fetch on category change
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchProducts(1);
      setQuantities({});
    }, 600); // ⏳ safer debounce time

    return () => clearTimeout(debounceTimeout.current);
  }, [selectedCategory]);

  // ✅ Initial load on first mount
  useEffect(() => {
    fetchProducts(1);
  }, []); // only once

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
