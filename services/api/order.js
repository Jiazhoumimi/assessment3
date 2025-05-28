import { API_BASE_URL } from '@env';

/**
 * Submit an order to backend API.
 */
export const submitOrder = async ({ token, userId, products, total, address }) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
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

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Order submission failed');
  }

  return await response.json();
};

/**
 * Get all orders for the current user.
 */
export const getOrders = async (token) => {
  const response = await fetch(`${API_BASE_URL}/orders/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  return await response.json();
};

/**
 * Get a single order by ID.
 */
export const getOrderById = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order details');
  }

  return await response.json();
};

/**
 * Update order status or address (PATCH).
 */
export const updateOrder = async (id, updates, token) => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update order');
  }

  return await response.json();
};

/**
 * Delete (cancel) an order.
 */
export const deleteOrder = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete order');
  }

  return await response.json();
};
