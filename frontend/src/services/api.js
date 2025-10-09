import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getFeatured: () => api.get('/products/featured'),
};

export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getUserOrders: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
};

export const reviewsAPI = {
  getByProduct: (productId, params) => api.get(`/reviews/product/${productId}`, { params }),
  create: (reviewData) => api.post('/reviews', reviewData),
};

export const subscribersAPI = {
  subscribe: (email) => api.post('/subscribers', { email }),
};

export const homepageAPI = {
  getContent: () => api.get('/homepage'),
};

export const utilsAPI = {
  checkPincode: (pincode) => api.post('/admin/check-pincode', { pincode }),
  uploadCustomImage: (formData) => api.post('/admin/upload-custom-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;