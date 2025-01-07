import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Required for cookies if using session auth
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // Auth types
  interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  interface LoginData {
    email: string;
    password: string;
  }
  
  interface AuthResponse {
    user: {
      id: number;
      name: string;
      email: string;
    };
    token: string;
  }

  export const AuthService = {
    async register(data: RegisterData): Promise<AuthResponse> {
      try {
        const response = await api.post('/register', data);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
      } catch (error) {
        throw this.handleError(error);
      }
    },
  
    async login(data: LoginData): Promise<AuthResponse> {
      try {
        const response = await api.post('/login', data);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
      } catch (error) {
        throw this.handleError(error);
      }
    },
  
    async logout(): Promise<void> {
      try {
        await api.post('/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (error) {
        throw this.handleError(error);
      }
    },
  
    getUser() {
      const userStr = localStorage.getItem('user');
      console.log(userStr);
      return userStr ? JSON.parse(userStr) : null;
    },
  
    getToken() {
      return localStorage.getItem('token');
    },
  
    isAuthenticated() {
      return !!this.getToken();
    },
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleError(error: any) {
      if (error.response) {
        return error.response.data;
      }
      return { message: 'An unexpected error occurred' };
    }
  };