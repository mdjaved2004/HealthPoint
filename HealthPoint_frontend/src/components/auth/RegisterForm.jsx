import React, { useState } from 'react';
import authService from '../../services/authService';
import './AuthModal.css';

const RegisterForm = ({ onSwitchToLogin, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userName: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!formData.userName.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.mobileNumber.trim()) {
      setError('Mobile number is required');
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setError('Mobile number must be 10 digits');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.register(formData);
      setSuccess('Registration successful! OTP sent to your email.');
      setOtpStep(true);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setError('OTP is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.verifyOtp(otp, formData.email);
      setSuccess('Registration completed successfully! Please login.');
      setTimeout(() => {
        onRegistrationSuccess();
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setError(
        err?.message ||
        (typeof err === 'string' ? err : 'OTP verification failed. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  if (otpStep) {
    return (
      <div className="auth-form">
        <h2>Verify OTP</h2>
        <p className="otp-message">An OTP has been sent to {formData.email}</p>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleOtpSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-control"
              disabled={loading}
              maxLength="6"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <button
          type="button"
          className="btn btn-link mt-2"
          onClick={() => {
            setOtpStep(false);
            setOtp('');
          }}
          disabled={loading}
        >
          Back to Registration
        </button>
      </div>
    );
  }

  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleRegisterSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
            disabled={loading}
          />
        </div>

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
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleInputChange}
            className="form-control"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
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

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="form-control"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="auth-switch">
        <p>Already have an account? <button className="btn-link" onClick={onSwitchToLogin}>Login</button></p>
      </div>
    </div>
  );
};

export default RegisterForm;
