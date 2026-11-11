# Authentication System - Code Examples & Recipes

## 📝 Common Usage Examples

### 1. Using Auth in Any Component

#### With AuthContext (Recommended):

```jsx
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Please login first</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

#### Without AuthContext:

```jsx
import authService from '../services/authService';

const MyComponent = () => {
  const isLoggedIn = authService.isAuthenticated();
  const token = authService.getAuthToken();

  if (!isLoggedIn) {
    return <p>Please login first</p>;
  }

  return <p>User is authenticated</p>;
};
```

### 2. Redirecting After Login

```jsx
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      // Redirect to home if not authenticated
      navigate('/');
    }
  }, [navigate]);

  return <div>Dashboard Content</div>;
};
```

### 3. Making API Calls with Authentication Token

```jsx
const fetchUserData = async () => {
  const token = authService.getAuthToken();
  
  try {
    const response = await fetch('http://localhost:8080/api/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
```

### 4. Protecting Routes

```jsx
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Usage in App.jsx:
// <ProtectedRoute>
//   <Dashboard />
// </ProtectedRoute>
```

### 5. Conditional Rendering Based on Auth Status

```jsx
const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>Welcome!</span>
          <button onClick={() => {
            authService.logout();
            setIsAuthenticated(false);
          }}>
            Logout
          </button>
        </>
      ) : (
        <button onClick={() => setShowAuthModal(true)}>
          Login
        </button>
      )}
    </header>
  );
};
```

## 🔧 Extending authService

### Add Password Reset

```javascript
// In src/services/authService.js

const authService = {
  // ... existing methods ...

  requestPasswordReset: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/request-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset request failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (email, resetToken, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token: resetToken,
          password: newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
```

### Add Token Refresh

```javascript
// In src/services/authService.js

const authService = {
  // ... existing methods ...

  refreshToken: async () => {
    try {
      const currentToken = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/refresh-token`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Token invalid, user needs to login again
        this.logout();
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};
```

### Add User Profile Fetch

```javascript
// In src/services/authService.js

const authService = {
  // ... existing methods ...

  getUserProfile: async () => {
    try {
      const token = this.getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const token = this.getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
```

## 🎨 Creating a Custom Auth Component

### Password Strength Indicator

```jsx
// src/components/auth/PasswordStrength.jsx

import React from 'react';
import './PasswordStrength.css';

const PasswordStrength = ({ password }) => {
  const calculateStrength = (pwd) => {
    let strength = 0;
    
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    
    return strength;
  };

  const strength = calculateStrength(password);
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColor = ['#dc3545', '#fd7e14', '#ffc107', '#17a2b8', '#20c997', '#28a745'];

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`bar ${i < strength ? 'active' : ''}`}
            style={{ backgroundColor: i < strength ? strengthColor[strength] : '#ddd' }}
          />
        ))}
      </div>
      <span className="strength-text" style={{ color: strengthColor[strength] }}>
        {strengthText[strength]}
      </span>
    </div>
  );
};

export default PasswordStrength;
```

### Email Verification Badge

```jsx
// src/components/auth/EmailVerificationStatus.jsx

import React from 'react';

const EmailVerificationStatus = ({ email, isVerified }) => {
  return (
    <div className="email-verification-status">
      <div className="email-display">
        <i className={`fas fa-envelope${isVerified ? '-open' : ''}`}></i>
        <span>{email}</span>
      </div>
      {isVerified ? (
        <div className="verified-badge">
          <i className="fas fa-check-circle"></i>
          <span>Verified</span>
        </div>
      ) : (
        <div className="pending-badge">
          <i className="fas fa-hourglass-half"></i>
          <span>Pending</span>
        </div>
      )}
    </div>
  );
};

export default EmailVerificationStatus;
```

## 🧪 Testing Examples

### Unit Test for Auth Service

```javascript
// src/services/__tests__/authService.test.js

import authService from '../authService';

describe('authService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('getAuthToken should return null when not authenticated', () => {
    expect(authService.getAuthToken()).toBeNull();
  });

  test('isAuthenticated should return false when no token', () => {
    expect(authService.isAuthenticated()).toBe(false);
  });

  test('isAuthenticated should return true when token exists', () => {
    localStorage.setItem('authToken', 'test-token');
    expect(authService.isAuthenticated()).toBe(true);
  });

  test('logout should clear token', () => {
    localStorage.setItem('authToken', 'test-token');
    authService.logout();
    expect(authService.getAuthToken()).toBeNull();
  });
});
```

### Component Test for LoginForm

```javascript
// src/components/auth/__tests__/LoginForm.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  test('renders login form elements', () => {
    render(<LoginForm onSwitchToRegister={() => {}} onLoginSuccess={() => {}} />);
    
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('shows error for empty email', async () => {
    render(<LoginForm onSwitchToRegister={() => {}} onLoginSuccess={() => {}} />);
    
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  test('disables submit button while loading', async () => {
    render(<LoginForm onSwitchToRegister={() => {}} onLoginSuccess={() => {}} />);
    
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
    fireEvent.click(loginButton);
    
    expect(loginButton).toBeDisabled();
  });
});
```

## 🔐 Security Best Practices

### Secure Token Storage with HttpOnly Cookies (Backend)

```javascript
// Backend example (Node.js/Express)
// Don't do this on frontend - use backend to set HttpOnly cookies

app.post('/api/user/login', (req, res) => {
  // ... validation and authentication ...
  
  const token = jwt.sign(userData, process.env.JWT_SECRET);
  
  // HttpOnly cookie prevents JavaScript access (XSS protection)
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour
  });
  
  res.json({ message: 'Login successful' });
});
```

### CSRF Token Implementation

```javascript
// In authService.js
const authService = {
  // ... existing methods ...

  getCSRFToken: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/csrf-token`);
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const csrfToken = await this.getCSRFToken();
      
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(userData),
      });

      // ... rest of method ...
    } catch (error) {
      throw error;
    }
  },
};
```

### Secure Password Hashing (Backend)

```javascript
// Backend example - DO NOT implement on frontend
const bcrypt = require('bcrypt');

app.post('/api/user/register', async (req, res) => {
  const { password, email } = req.body;

  try {
    // Hash password with salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store hashedPassword in database, never store plain password
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify password during login
const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);
```

## 🚀 Performance Optimization

### Lazy Load Auth Components

```jsx
// In Header.jsx
import { lazy, Suspense } from 'react';

const AuthModal = lazy(() => import('./auth/AuthModal'));

export const Header = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </Suspense>
    </>
  );
};
```

### Memoize Auth State

```jsx
import { useMemo, useState } from 'react';
import authService from '../services/authService';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authStatus = useMemo(() => ({
    isAuthenticated,
    hasToken: authService.getAuthToken() !== null,
  }), [isAuthenticated]);

  return (
    // ... use authStatus ...
  );
};
```

## 📊 Debugging Helpers

### Log API Requests and Responses

```javascript
// In authService.js
const authService = {
  _logRequest(method, url, data) {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔴 API Request: ${method} ${url}`);
      console.log('Payload:', data);
      console.groupEnd();
    }
  },

  _logResponse(url, status, data) {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🟢 API Response: ${status} ${url}`);
      console.log('Data:', data);
      console.groupEnd();
    }
  },

  login: async (email, password) => {
    this._logRequest('POST', '/login', { email });
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      this._logResponse('/login', response.status, data);
      
      // ... rest of method ...
    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  },
};
```

---

These examples provide practical implementations you can use and extend for your specific needs.
