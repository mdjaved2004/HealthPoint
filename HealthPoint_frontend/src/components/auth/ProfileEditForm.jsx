import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';
import '../auth/AuthModal.css';
import './ProfileEditForm.css';

const ProfileEditForm = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    mobileNumber: user?.mobileNumber || '',
    stateName: user?.stateName || '',
    district: user?.district || '',
    city: user?.city || '',
    address: user?.address || '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        email: user.email || '',
        name: user.name || '',
        mobileNumber: user.mobileNumber || '',
        stateName: user.stateName || '',
        district: user.district || '',
        city: user.city || '',
        address: user.address || '',
      });
    }

    // If user data is incomplete, fetch from backend
    if (user && (!user.name || !user.mobileNumber)) {
      const fetchProfile = async () => {
        try {
          const profile = await authService.getUserProfile();
          setProfileData({
            email: profile.email || user.email || '',
            name: profile.name || user.name || '',
            mobileNumber: profile.mobileNumber || user.mobileNumber || '',
            stateName: profile.stateName || user.stateName || '',
            district: profile.district || user.district || '',
            city: profile.city || user.city || '',
            address: profile.address || user.address || '',
          });
          // Optionally update auth context
          if (updateUser) {
            updateUser(profile);
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        }
      };
      fetchProfile();
    }
  }, [user, updateUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!profileData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!profileData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!profileData.mobileNumber.trim()) {
      setError('Mobile number is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authService.updateProfile(profileData);
      
      // Update auth context with new user data
      if (updateUser) {
        updateUser(result.user || result);
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-card">
        <h2 className="form-title">Edit Profile</h2>

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

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                value={profileData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="stateName" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="stateName"
                name="stateName"
                value={profileData.stateName}
                onChange={handleInputChange}
                placeholder="Enter your state"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="district" className="form-label">
                District
              </label>
              <input
                type="text"
                className="form-control"
                id="district"
                name="district"
                value={profileData.district}
                onChange={handleInputChange}
                placeholder="Enter your district"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              rows="3"
              value={profileData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
            ></textarea>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;
