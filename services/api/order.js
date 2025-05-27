// services/api/order.js
import axios from 'axios';
const ORDER_URL = 'https://n11501910.ifn666.com/assessment02/orders';

//  Create a new order
export const createOrder = async (orderData, token) => {
  const res = await axios.post(ORDER_URL, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

//  Submit order (used when building manually)
export const submitOrder = async ({ token, userId, products, total, address }) => {
  const response = await fetch(ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user: userId,
      products,
      total,
      shippingAddress: address,
    }),
  });

  if (!response.ok) throw new Error('Order submission failed');
  return await response.json();
};

//  Get all orders for the logged-in user
export const getMyOrders = async (token) => {
  const res = await axios.get(ORDER_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return Array.isArray(res.data?.data) ? res.data.data : [];
};

//  Get a specific order by ID
export const getOrderById = async (id, token) => {
  const res = await axios.get(`${ORDER_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

//  Update an order
export const updateOrder = async (id, updatedData, token) => {
  const res = await axios.put(`${ORDER_URL}/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
