const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('ragyu_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API Error: ${response.status}`);
  }

  return response.json();
};

export const authApi = {
  login: async (email: string, name: string) => {
    return apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  },

  createGuest: async () => {
    return apiClient('/auth/guest', {
      method: 'POST',
    });
  },
};

export const quizApi = {
  startQuiz: async (config: any) => {
    return apiClient('/quiz/start', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  },

  saveResult: async (result: any) => {
    return apiClient('/quiz/result', {
      method: 'POST',
      body: JSON.stringify(result),
    });
  },
};

export const userApi = {
  getCurrentUser: async () => {
    return apiClient('/user/me');
  },
};

export const chatApi = {
  sendMessage: async (message: string) => {
    return apiClient('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
};

export const healthApi = {
  check: async () => {
    return apiClient('/health');
  },
};
