import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const BASE_URL = 'https://n11501910.ifn666.com/assessment02/products';

export default function useProductBrowser(selectedCategory, sortOrder = null) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceTimeout = useRef(null);
  const requestLock = useRef(false);

  // ✅ Fetch product list (with pagination and sorting)
  const fetchProducts = async (targetPage = 1, sort = sortOrder) => {
    if (requestLock.current || loading) return;

    try {
      requestLock.current = true;
      setLoading(true);

      const params = { page: targetPage, limit: 6 };
      if (selectedCategory) params.category = selectedCategory;
      if (sort) params.sort = sort;

      const res = await axios.get(BASE_URL, { params });
      const newProducts = res.data.products || [];
      const isFirstPage = targetPage === 1;

      if (isFirstPage) {
        setProducts([]); // ✅ Clear old data before replacing
      }

      setProducts((prev) =>
        isFirstPage ? newProducts : [...prev, ...newProducts]
      );
      setPage(targetPage);
      setHasMore(targetPage < res.data.totalPages);
      setTotalCount(res.data.total || 0);

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

  // ✅ Watch category/sort change → refetch from page 1
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchProducts(1, sortOrder);
    }, 400); // slight delay for smoothness

    return () => clearTimeout(debounceTimeout.current);
  }, [selectedCategory, sortOrder]);

  // ✅ First load
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
    fetchProducts,
  };
}
