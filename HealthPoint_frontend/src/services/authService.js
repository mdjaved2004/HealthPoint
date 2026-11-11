const API_BASE_URL = 'http://localhost:8081/api/user';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        let errorMessage = 'Registration failed';
        
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          } else {
            errorMessage = 'Server error: ' + response.status + ' ' + response.statusText;
          }
        } catch (parseError) {
          errorMessage = 'Registration failed: ' + response.status + ' ' + response.statusText;
        }
        
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format from server');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Send OTP
  sendOtp: async (otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      if (!response.ok) {
        throw new Error('OTP send failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Verify OTP
  verifyOtp: async (otp, email = null) => {
    try {
      const payload = { otp };
      if (email) {
        payload.email = email;
      }

      const response = await fetch(`${API_BASE_URL}/sendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = 'OTP verification failed';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } else if (response.statusText) {
            errorMessage = response.statusText;
          }
        } catch {
          if (response.statusText) {
            errorMessage = response.statusText;
          }
        }
        throw new Error(errorMessage || `OTP verification failed (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        let errorMessage = 'Profile update failed';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (parseError) {
          errorMessage = 'Profile update failed: ' + response.status;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Send forget password link
  forgetPasswordLinkSend: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forget-password-link-send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (resetData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
      });

      if (!response.ok) {
        let errorMessage = 'Password reset failed';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (parseError) {
          errorMessage = 'Password reset failed: ' + response.status;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include session cookies
        body: JSON.stringify({ email, password }),
      });

      // Handle non-OK responses
      if (!response.ok) {
        let errorMessage = 'Login failed';
        
        try {
          // Try to parse as JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          } else {
            // If not JSON, it might be HTML error page (CORS issue)
            const text = await response.text();
            if (text.includes('Invalid CORS')) {
              errorMessage = 'CORS Error: Backend not allowing requests. Please ensure backend has CORS enabled.';
            } else {
              errorMessage = 'Server error: ' + response.status + ' ' + response.statusText;
            }
          }
        } catch (parseError) {
          errorMessage = 'Login failed: ' + response.status + ' ' + response.statusText;
        }
        
        throw new Error(errorMessage);
      }

      // Parse response
      let data;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          throw new Error('Invalid response format from server');
        }
      } catch (parseError) {
        throw new Error('Failed to parse server response: ' + parseError.message);
      }
      
      // Store token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      // Store login timestamp
      localStorage.setItem('loginTime', new Date().getTime());

      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  getAuthToken: () => {
    return localStorage.getItem('authToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  getUserProfile: async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  getUserDataFromSession: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session cookies to get user data
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
