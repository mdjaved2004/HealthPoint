import React, { useState } from 'react';
import authService from '../../services/authService';
import './AuthModal.css';

const ForgotPasswordForm = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState('email'); // 'email', 'reset'
  const [email, setEmail] = useState('');
  const [resetData, setResetData] = useState({
    email: '',
    userName: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email format');
      }

      await authService.forgetPasswordLinkSend(email);
      setSuccess('Password reset link has been sent to your email address.');
      setStep('reset');
      setResetData((prev) => ({
        ...prev,
        email,
      }));
    } catch (err) {
      console.error('Error sending reset link:', err);
      setError(
        err.message ||
        'Failed to send reset link. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetFormChange = (e) => {
    const { name, value } = e.target;
    setResetData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!resetData.email.trim()) {
        throw new Error('Email is required');
      }
      if (!resetData.userName.trim()) {
        throw new Error('Username is required');
      }
      if (!resetData.newPassword) {
        throw new Error('New password is required');
      }
      if (resetData.newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      if (resetData.newPassword !== resetData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const result = await authService.resetPassword({
        email: resetData.email,
        userName: resetData.userName,
        newPassword: resetData.newPassword,
        confirmPassword: resetData.confirmPassword,
      });

      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      console.error('Error resetting password:', err);
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {error && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success alert-dismissible" role="alert">
          {success}
        </div>
      )}

      {step === 'email' ? (
        <form onSubmit={handleSendResetLink}>
          <h4 className="form-title">Reset Password</h4>
          <p className="form-subtitle">
            Enter your email address to receive a password reset link.
          </p>

          <div className="form-group mb-3">
            <label htmlFor="email-reset" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email-reset"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div className="form-footer text-center mt-3">
            <p>
              Remember your password?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="link-button"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <h4 className="form-title">Set New Password</h4>

          <div className="form-group mb-3">
            <label htmlFor="reset-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="reset-email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              value={resetData.email}
              onChange={handleResetFormChange}
              required
              disabled
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="reset-username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="reset-username"
              className="form-control"
              placeholder="Enter your username"
              name="userName"
              value={resetData.userName}
              onChange={handleResetFormChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="new-password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="form-control"
              placeholder="Enter new password"
              name="newPassword"
              value={resetData.newPassword}
              onChange={handleResetFormChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="form-control"
              placeholder="Confirm new password"
              name="confirmPassword"
              value={resetData.confirmPassword}
              onChange={handleResetFormChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          <div className="form-footer text-center mt-3">
            <p>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="link-button"
              >
                Back to Login
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
