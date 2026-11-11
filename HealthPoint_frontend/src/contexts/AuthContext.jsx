import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = authService.getAuthToken();
    const storedUser = localStorage.getItem('authUser');
    
    console.log('========== AUTH CONTEXT INITIALIZATION ==========');
    console.log('Token found:', !!token, 'Token value:', token);
    console.log('Stored user found:', !!storedUser);
    if (storedUser) {
      try {
        console.log('Parsed stored user:', JSON.parse(storedUser));
      } catch (e) {
        console.log('Failed to parse stored user');
      }
    }
    console.log('================================================');
    
    if (token) {
      // Restore user data from localStorage if it exists
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log('✓ Restoring user:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Failed to parse stored user data:', err);
          console.log('⚠ Setting authenticated to true anyway (token exists)');
          setIsAuthenticated(true); // Still authenticated even if user data parsing fails
        }
      } else {
        console.log('⚠ Token exists but no stored user - setting authenticated to true');
        setIsAuthenticated(true);
      }
    } else {
      console.log('❌ No token found - user not authenticated');
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('========== LOGIN PROCESS START ==========');
      const response = await authService.login(email, password);
      
      console.log('Login response received:', response);
      console.log('Response structure - response.token:', response.token);
      console.log('Response structure - response.user:', response.user);
      console.log('Token in localStorage after login:', localStorage.getItem('authToken'));
      
      setIsAuthenticated(true);
      
      // Handle response data structure
      // Backend returns: { user: {...}, email: "..." }
      // User data is nested under 'user' field
      const userInfo = response.user || response.data || response;
      
      console.log('Extracted userInfo:', userInfo);
      
      // Extract userId from the correct location
      const userId = userInfo.userId || userInfo.id;
      
      console.log('Extracted userId:', userId);
      
      // Store user data from login response
      const userData = {
        ...userInfo,  // Spread first to get all fields from user object
        userId: userId,  // Ensure userId is set (overrides any previous value)
        email: userInfo.email || response.email || email,
        token: response.token,  // Token might be undefined, that's ok
      };
      
      console.log('✓ Login successful - userId:', userId);
      console.log('✓ User data prepared:', userData);
      
      // Store token if provided
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        console.log('✓ Token stored in localStorage');
      } else {
        console.warn('⚠ No token in response - authentication may rely on session/cookies');
      }
      
      // If mobileNumber is missing, try to fetch full profile
      if (!userData.mobileNumber && !userData.mobile_number) {
        try {
          const profile = await authService.getUserProfile();
          userData.name = profile.name || userData.name;
          userData.mobileNumber = profile.mobileNumber || profile.mobile_number || userData.mobileNumber;
          userData.stateName = profile.stateName || userData.stateName;
          userData.district = profile.district || userData.district;
          userData.city = profile.city || userData.city;
          userData.address = profile.address || userData.address;
        } catch (profileError) {
          console.warn('Could not fetch user profile:', profileError);
        }
      }
      
      // Store user data in localStorage for persistence
      localStorage.setItem('authUser', JSON.stringify(userData));
      
      console.log('✓ User data stored in localStorage');
      console.log('✓ Setting user state and isAuthenticated=true');
      
      setUser(userData);
      console.log('========== LOGIN PROCESS COMPLETE ==========');
      
      return response;
    } catch (error) {
      console.error('❌ Login error:', error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await authService.verifyOtp(otp);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('authUser'); // Clear stored user data
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUserData) => {
    console.log('Updating user data:', updatedUserData);
    const newUserData = {
      ...user,
      ...updatedUserData,
    };
    setUser(newUserData);
    localStorage.setItem('authUser', JSON.stringify(newUserData));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    verifyOtp,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
