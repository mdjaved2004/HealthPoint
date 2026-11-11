import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';
import './AuthModal.css';

const LoginForm = ({ onSwitchToRegister, onSwitchToForgotPassword, onLoginSuccess }) => {
  const { login: contextLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Use context login to properly set user state
      const response = await contextLogin(formData.email, formData.password);
      
      if (rememberMe) {
        localStorage.setItem('rememberEmail', formData.email);
      } else {
        localStorage.removeItem('rememberEmail');
      }

      onLoginSuccess(response);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
            disabled={loading}
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="form-check-input"
            disabled={loading}
          />
          <label htmlFor="rememberMe" className="form-check-label">
            Remember me
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="auth-switch">
        <p>Don't have an account? <button className="btn-link" onClick={onSwitchToRegister}>Register</button></p>
      </div>

      <div className="forgot-password">
        <button className="btn-link" onClick={onSwitchToForgotPassword}>Forgot Password?</button>
      </div>
    </div>
  );
};

export default LoginForm;
