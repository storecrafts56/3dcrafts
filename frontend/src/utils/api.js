import axios from "axios";

// Base API URL (update as needed)
const API_BASE_URL = "https://threedcrafts-1.onrender.com/api";

// Helper to get auth token if needed
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Products
export const fetchProducts = async (params = {}) => {
  const res = await axios.get(`${API_BASE_URL}/products`, { params });
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/products/${id}`);
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await axios.post(`${API_BASE_URL}/products`, productData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_BASE_URL}/products/${id}`, productData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/products/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Cart
export const fetchCart = async () => {
  const res = await axios.get(`${API_BASE_URL}/cart`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await axios.post(
    `${API_BASE_URL}/cart`,
    { productId, quantity },
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const res = await axios.put(
    `${API_BASE_URL}/cart/${cartItemId}`,
    { quantity },
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const removeCartItem = async (cartItemId) => {
  const res = await axios.delete(`${API_BASE_URL}/cart/${cartItemId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Orders
export const fetchOrders = async () => {
  const res = await axios.get(`${API_BASE_URL}/orders`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await axios.post(`${API_BASE_URL}/orders`, orderData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const fetchOrderById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/orders/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// User Authentication
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return res.data;
};

export const fetchUserProfile = async () => {
  const res = await axios.get(`${API_BASE_URL}/users/profile`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Categories
export const fetchCategories = async () => {
  const res = await axios.get(`${API_BASE_URL}/categories`);
  return res.data;
};

export const fetchCategoryById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/categories/${id}`);
  return res.data;
};

// Reviews
export const fetchProductReviews = async (productId) => {
  const res = await axios.get(`${API_BASE_URL}/reviews/product/${productId}`);
  return res.data;
};

export const addProductReview = async (productId, reviewData) => {
  const res = await axios.post(`${API_BASE_URL}/reviews`, reviewData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
