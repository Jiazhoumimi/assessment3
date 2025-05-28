// useProductBrowser.js
// Custom hook for browsing products with category filter, price sorting, and pagination

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@env';

const BASE_URL = `${API_BASE_URL}/products`;

export default function useProductBrowser(selectedCategory, sortOrder = null) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceTimeout = useRef(null); // Debounce timer reference
  const requestLock = useRef(false); // Prevent overlapping requests

  // 🔁 Fetch products from server
  const fetchProducts = async (targetPage = 1) => {
    if (requestLock.current || loading) return;

    try {
      requestLock.current = true;
      setLoading(true);

      const params = { page: targetPage, limit: 6 };
      if (selectedCategory) params.category = selectedCategory; // Filter by category
      if (sortOrder) params.sort = sortOrder; // Sort by price

      const res = await axios.get(BASE_URL, { params });
      const newProducts = res.data.products || [];
      const isFirstPage = targetPage === 1;

      if (isFirstPage) {
        setProducts([]); // Clear products before first page load
      }

      setProducts((prev) =>
        isFirstPage ? newProducts : [...prev, ...newProducts]
      );

      setPage(targetPage);
      setHasMore(targetPage < res.data.totalPages); // For infinite scroll
      setTotalCount(res.data.total || 0);

      console.log(`[FETCH] Page ${targetPage}, Sort: ${sortOrder}, Items: ${newProducts.length}`);
    } catch (err) {
      console.error('[useProductBrowser] Fetch failed:', err);
      setProducts([]);
      setTotalCount(0);
    } finally {
      requestLock.current = false;
      setLoading(false);
    }
  };

  // ⏱ Debounced reload when category or sort changes
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchProducts(1); // Refresh from first page
    }, 400);

    return () => clearTimeout(debounceTimeout.current);
  }, [selectedCategory, sortOrder]);

  // 🔄 Initial load
  useEffect(() => {
    fetchProducts(1);
  }, []);

  return {
    products,
    totalCount,
    page,
    hasMore,
    loading,
    setPage,
    fetchProducts, // Use fetchProducts(page + 1) to load more
  };
}
