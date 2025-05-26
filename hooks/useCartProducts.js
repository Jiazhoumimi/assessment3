import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://n11501910.ifn666.com/assessment02/products';

export default function useCartProducts(productIds = []) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCartProducts = async () => {
    if (!productIds || productIds.length === 0) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      const promises = productIds.map(id =>
        axios.get(`${BASE_URL}/${id}`).then(res => res.data)
      );
      const results = await Promise.all(promises);
      setProducts(results);
    } catch (err) {
      console.error('[useCartProducts] Fetch failed:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [JSON.stringify(productIds)]);

  return {
    products,
    loading,
    refetch: fetchCartProducts,
  };
}
