// useProductBrowser.js
// This hook retrieves a product list for browsing.
// Supports category filter, price sorting, and infinite scroll.

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const BASE_URL = 'https://n11501910.ifn666.com/assessment02/products';

export default function useProductBrowser(selectedCategory, sortOrder = null) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceTimeout = useRef(null); // For debounce delay
  const requestLock = useRef(false); // Prevent duplicate requests

  // Fetch product list with pagination, category, and sort options
  const fetchProducts = async (targetPage = 1, sort = sortOrder) => {
    if (requestLock.current || loading) return;

    try {
      requestLock.current = true;
      setLoading(true);

      const params = { page: targetPage, limit: 6 };
      if (selectedCategory) params.category = selectedCategory; // 🗂️ Filter by category
      if (sort) params.sort = sort; // ↕️ Sort by price

      const res = await axios.get(BASE_URL, { params });
      const newProducts = res.data.products || [];
      const isFirstPage = targetPage === 1;

      if (isFirstPage) {
        setProducts([]); // 🧹 Clear previous results if refreshing
      }

      // 📦 Append or replace product list
      setProducts((prev) =>
        isFirstPage ? newProducts : [...prev, ...newProducts]
      );

      setPage(targetPage);
      setHasMore(targetPage < res.data.totalPages); // Check if more data exists
      setTotalCount(res.data.total || 0); // Total products count

      console.log(`[FETCH] Page ${targetPage}, Sort: ${sort}, Items: ${newProducts.length}`);
    } catch (err) {
      console.error('[useProductBrowser] Fetch failed:', err);
      setProducts([]);
      setTotalCount(0);
    } finally {
      requestLock.current = false;
      setLoading(false);
    }
  };

  // Refetch when category or sort changes (with debounce)
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchProducts(1, sortOrder); // Reset to page 1
    }, 400); // ⏱ Smooth transition

    return () => clearTimeout(debounceTimeout.current);
  }, [selectedCategory, sortOrder]);

  // Initial load
  useEffect(() => {
    fetchProducts(1, sortOrder);
  }, []);

  return {
    products,
    totalCount,
    page,
    hasMore,
    loading,
    setPage,
    fetchProducts, // For manual pagination
  };
}
