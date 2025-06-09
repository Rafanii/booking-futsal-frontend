import axios from 'axios';

// API Base URL Configuration
const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development' || import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Determine base URL based on environment
let baseURL;
if (isProduction) {
  // Production: Use direct Railway API URL
  baseURL = 'https://booking-futsal-production.up.railway.app/api';
} else {
  // Development: Use Vite proxy
  baseURL = '/api';
}

// Environment logging
console.log('🌍 Environment Mode:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');
console.log('📡 API Base URL:', baseURL);

if (isDevelopment) {
  console.log('🔧 Development Mode - Using Vite Proxy');
  console.log('🔍 VITE_API_URL env var:', import.meta.env.VITE_API_URL);
} else {
  console.log('🚀 Production Mode - Direct Railway API');
}

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Important for HttpOnly cookie authentication
  timeout: 15000, // 15 seconds timeout for production
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add Origin header for production CORS
    ...(isProduction && {
      'Origin': 'https://booking-futsal-frontend.vercel.app'
    })
  },
});

// Request interceptor for authentication and debugging
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization header as fallback for cross-domain cookie issues
    const token = localStorage.getItem('auth_token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (isDevelopment) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        hasAuth: !!config.headers.Authorization,
        withCredentials: config.withCredentials
      });
    }

    return config;
  },
  (error) => {
    if (isDevelopment) {
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (isDevelopment) {
      console.log('📥 API Response:', {
        status: response.status,
        url: response.config.url,
        success: response.data?.success,
        message: response.data?.message
      });
    }
    return response;
  },
  (error) => {
    // Log error in development
    if (isDevelopment) {
      console.error('❌ API Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.response?.data?.error || error.message,
        data: error.response?.data
      });
    }

    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login only if not already on login page
      if (!window.location.pathname.includes('/login')) {
        console.warn('⚠️ Unauthorized access - redirecting to login');
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      // Forbidden - insufficient permissions
      console.warn('⚠️ Access forbidden - insufficient permissions');
    } else if (error.response?.status >= 500) {
      // Server error
      console.error('🚨 Server error:', error.response?.data?.error || 'Internal server error');
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      // Network error
      console.error('🌐 Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
