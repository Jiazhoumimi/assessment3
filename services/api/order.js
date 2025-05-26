import axios from 'axios';
const BASE_URL = 'https://n11501910.ifn666.com/assessment02/orders';

export const createOrder = async (orderData, token) => {
  const res = await axios.post(BASE_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getMyOrders = async (token) => {
  const res = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
