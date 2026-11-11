import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // Extract user initials for avatar
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.name) {
      return user.name;
    }
    if (user?.email) {
      return user.email;
    }
    return 'User';
  };

  return (
    <div className="user-profile-container" ref={dropdownRef}>
      <button
        className="user-profile-btn"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        title="User Profile"
      >
        <div className="user-avatar">
          {getInitials()}
        </div>
        <span className="user-name-short">{getUserDisplayName().split(' ')[0]}</span>
        <i className={`fas fa-chevron-down ${isDropdownOpen ? 'open' : ''}`}></i>
      </button>

      {isDropdownOpen && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-avatar-large">
              {getInitials()}
            </div>
            <div className="profile-info">
              <p className="profile-name">{getUserDisplayName()}</p>
              <p className="profile-email">{user?.email || 'user@example.com'}</p>
            </div>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-menu">
            <a href="#" className="profile-menu-item" onClick={(e) => {
              e.preventDefault();
              navigate('/profile');
              setIsDropdownOpen(false);
            }}>
              <i className="fas fa-user"></i>
              <span>My Profile</span>
            </a>

            <a href="#" className="profile-menu-item" onClick={(e) => {
              e.preventDefault();
              // Navigate to settings
              setIsDropdownOpen(false);
            }}>
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </a>

            <a href="#" className="profile-menu-item" onClick={(e) => {
              e.preventDefault();
              // Navigate to appointments
              setIsDropdownOpen(false);
            }}>
              <i className="fas fa-calendar"></i>
              <span>My Appointments</span>
            </a>

            <a href="#" className="profile-menu-item" onClick={(e) => {
              e.preventDefault();
              // Navigate to medical records
              setIsDropdownOpen(false);
            }}>
              <i className="fas fa-file-medical"></i>
              <span>Medical Records</span>
            </a>
          </div>

          <div className="profile-divider"></div>

          <button
            className="profile-logout-btn"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
