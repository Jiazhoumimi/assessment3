import axios from 'axios';
const BASE_URL = 'https://n11501910.ifn666.com/assessment02/products';

export const fetchProducts = async (params = {}) => {
  const res = await axios.get(BASE_URL, { params });
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};
