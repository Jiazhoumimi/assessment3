// services/api/user.js
import axios from 'axios';
const BASE_URL = 'https://n11501910.ifn666.com/assessment02/users';

// Get all users (e.g. admin view)
export const fetchAllUsers = async (token) => {
  const res = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
