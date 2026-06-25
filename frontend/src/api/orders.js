import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/v1';

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

export async function createOrder(token, payload) {
  const res = await axios.post(`${API_BASE}/orders/`, payload, {
    headers: authHeaders(token),
  });
  return res.data;
}

export async function getOrders(token) {
  const res = await axios.get(`${API_BASE}/orders/`, {
    headers: authHeaders(token),
  });
  return res.data;
}

export async function getOrder(token, id) {
  const res = await axios.get(`${API_BASE}/orders/${id}/`, {
    headers: authHeaders(token),
  });
  return res.data;
}
