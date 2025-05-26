// services/api/order.js

export const submitOrder = async ({ token, userId, products, total, address }) => {
  const response = await fetch('https://n11501910.ifn666.com/assessment02/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user: userId, // use dynamic userId
      products,
      total,
      shippingAddress: address,
    }),
  });

  if (!response.ok) throw new Error('Order submission failed');

  return await response.json();
};
