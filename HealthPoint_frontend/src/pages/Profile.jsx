import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    medicalConditions: '',
    allergies: '',
    medications: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      // Map backend session data to profile form
      // Backend returns: name, email, userName, phoneNumber
      setProfileData({
        firstName: user.name ? user.name.split(' ')[0] : user.firstName || '',
        lastName: user.name ? user.name.split(' ').slice(1).join(' ') : user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || user.phone || '',
        userName: user.userName || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        bloodType: user.bloodType || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        medicalConditions: user.medicalConditions || '',
        allergies: user.allergies || '',
        medications: user.medications || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      // Update user context here if needed
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (profileData.firstName && profileData.lastName) {
      return `${profileData.firstName[0]}${profileData.lastName[0]}`.toUpperCase();
    }
    if (profileData.email) {
      return profileData.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      <main className="profile-page">
        <div className="profile-container">
          <div className="profile-header-section">
            <div className="profile-avatar-large">
              {getInitials()}
            </div>
            <div className="profile-header-info">
              <h1>{profileData.firstName} {profileData.lastName}</h1>
              <p className="profile-email">{profileData.email}</p>
              <button
                className="btn-edit-profile"
                onClick={() => setIsEditing(!isEditing)}
              >
                <i className={`fas fa-${isEditing ? 'times' : 'edit'}`}></i>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}

          <form className="profile-form" onSubmit={handleUpdateProfile}>
            <div className="form-section">
              <h2>Personal Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Blood Type</label>
                  <select
                    name="bloodType"
                    value={profileData.bloodType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Address Information</h2>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                    placeholder="Street address"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                    placeholder="State"
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                    placeholder="Zip Code"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Medical Information</h2>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Medical Conditions</label>
                  <textarea
                    name="medicalConditions"
                    value={profileData.medicalConditions}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                    placeholder="List any medical conditions"
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Allergies</label>
                  <textarea
                    name="allergies"
                    value={profileData.allergies}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                    placeholder="List any allergies"
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Current Medications</label>
                  <textarea
                    name="medications"
                    value={profileData.medications}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-control"
                    placeholder="List current medications"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>

          <div className="profile-footer">
            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  logout();
                  window.location.href = '/';
                }
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
