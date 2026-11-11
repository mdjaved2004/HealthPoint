import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Show success message briefly then close
    setTimeout(() => {
      onClose();
      setActiveTab('login');
      setUser(null);
    }, 2000);
  };

  const handleRegistrationSuccess = () => {
    // Just switch tabs, LoginForm will be displayed
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="auth-modal-content">
          {activeTab === 'login' ? (
            <LoginForm
              onSwitchToRegister={() => setActiveTab('register')}
              onSwitchToForgotPassword={() => setActiveTab('forgotpassword')}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : activeTab === 'register' ? (
            <RegisterForm
              onSwitchToLogin={() => setActiveTab('login')}
              onRegistrationSuccess={handleRegistrationSuccess}
            />
          ) : (
            <ForgotPasswordForm
              onSwitchToLogin={() => setActiveTab('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
