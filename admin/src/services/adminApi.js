import axios from 'axios';

const API_URL = 'https://threedcrafts-1.onrender.com/api';

export const adminApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
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
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      delete adminApi.defaults.headers.common['Authorization'];
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => adminApi.post('/auth/admin/login', credentials),
  getMe: () => adminApi.get('/auth/me'),
};

export const dashboardAPI = {
  getStats: () => adminApi.get('/admin/stats'),
};

export const productsAPI = {
  getAll: (params) => adminApi.get('/products', { params }),
  getById: (id) => adminApi.get(`/products/${id}`),
  create: (productData) => adminApi.post('/products', productData),
  update: (id, productData) => adminApi.put(`/products/${id}`, productData),
  delete: (id) => adminApi.delete(`/products/${id}`),
  uploadImages: (id, formData) => adminApi.post(`/products/${id}/upload`, formData),
};

export const ordersAPI = {
  getAll: (params) => adminApi.get('/orders/admin/all', { params }),
  getById: (id) => adminApi.get(`/orders/${id}`),
  updateStatus: (id, status) => adminApi.put(`/orders/${id}/status`, { status }),
};

export const customersAPI = {
  getAll: (params) => adminApi.get('/admin/customers', { params }),
  getById: (id) => adminApi.get(`/admin/customers/${id}`),
};

export const reviewsAPI = {
  getAll: (params) => adminApi.get('/reviews/admin/all', { params }),
  approve: (id) => adminApi.put(`/reviews/${id}/approve`),
  delete: (id) => adminApi.delete(`/reviews/${id}`),
};

export const subscribersAPI = {
  getAll: (params) => adminApi.get('/subscribers/admin/all', { params }),
  unsubscribe: (id) => adminApi.put(`/subscribers/${id}/unsubscribe`),
  delete: (id) => adminApi.delete(`/subscribers/${id}`),
};

export const homepageAPI = {
  getContent: () => adminApi.get('/homepage'),
  updateContent: (content) => adminApi.put('/homepage/admin/update', content),
  uploadBanner: (formData) => adminApi.post('/homepage/admin/upload-banner', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default adminApi;
