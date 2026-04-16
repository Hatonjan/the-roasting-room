/**
 * api.js
 * 
 * Central API service layer
 * All HTTP requests to Django backend go through here
 * This keeps components clean and API logic centralized
 * 
 * Base URL: http://127.0.0.1:8000/api/
 * 
 * Usage:
 *   import { getProducts, login, addToCart } from './services/api';
 *   const products = await getProducts();
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Helper function to make API requests
 * Automatically includes auth token if available
 */
async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add auth token to headers if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// ===== PRODUCTS API =====

export async function getProducts() {
  return apiRequest('/products/');
}

export async function getProductDetail(id) {
  return apiRequest(`/products/${id}/`);
}

// ===== AUTH API =====

export async function register(userData) {
  return apiRequest('/users/register/', 'POST', userData);
}

export async function login(email, password) {
  return apiRequest('/users/login/', 'POST', { email, password });
}

export async function getUserProfile(token) {
  return apiRequest('/users/profile/', 'GET', null, token);
}

export async function logout(token) {
  return apiRequest('/users/logout/', 'POST', null, token);
}

// ===== CART API =====

export async function getCart(token) {
  return apiRequest('/cart/', 'GET', null, token);
}

export async function addToCart(productId, quantity, token) {
  return apiRequest('/cart/items/', 'POST', { product: productId, quantity }, token);
}

export async function updateCartItem(itemId, quantity, token) {
  return apiRequest(`/cart/items/${itemId}/`, 'PATCH', { quantity }, token);
}

export async function removeFromCart(itemId, token) {
  return apiRequest(`/cart/items/${itemId}/`, 'DELETE', null, token);
}

// ===== ORDERS API =====

export async function createOrder(token) {
  return apiRequest('/orders/', 'POST', {}, token);
}

export async function getOrders(token) {
  return apiRequest('/orders/', 'GET', null, token);
}

export async function getOrderDetail(orderId, token) {
  return apiRequest(`/orders/${orderId}/`, 'GET', null, token);
}
