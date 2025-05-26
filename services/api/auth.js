import axios from 'axios';
const BASE_URL = 'https://n11501910.ifn666.com/assessment02';

export const login = async (email) => {
  const res = await axios.post(`${BASE_URL}/login`, { email });
  return res.data;
};

export const register = async (name, email) => {
  const res = await axios.post(`${BASE_URL}/register`, { name, email });
  return res.data;
};
