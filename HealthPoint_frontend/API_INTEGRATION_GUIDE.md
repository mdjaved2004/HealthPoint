# Medical Center - API Integration Guide

## Overview
This document outlines all the backend APIs that have been integrated into the React frontend application.

## Services Created

### 1. **authService.js** - User Authentication & Profile Management
**Base URL:** `http://localhost:8080/api/user`

#### Endpoints:
- **POST /register** - Register a new user
  - Required: `name`, `email`, `userName`, `mobileNumber`, `password`, `confirmPassword`
  
- **POST /sendOtp** - Send/Verify OTP
  - Required: `otp`
  
- **POST /login** - User login
  - Required: `email`, `password`
  
- **PUT /update-profile** - Update user profile
  - Required: `email`, `name`, `mobileNumber`
  - Optional: `stateName`, `district`, `city`, `address`
  
- **POST /forget-password-link-send** - Send password reset link
  - Required: `email`
  
- **PUT /reset-password** - Reset user password
  - Required: `email`, `userName`, `newPassword`, `confirmPassword`

---

### 2. **doctorService.js** - Doctor Management
**Base URL:** `http://localhost:8080/api/doctor`

#### Endpoints:
- **GET /getAllDoctors** - Get all available doctors
  
- **GET /searchDoctors** - Search doctors with filters
  - Query params: `specialization`, `location`, `language`, `minFees`, `maxFees`
  
- **POST /doctorProfile** - Create doctor profile (Be a Consultant)
  - Required: `specialization`, `licenseNumber`, `experience`, `description`, `hospitalName`, `fees`, `languages`, `availableStartTime`, `availableEndTime`, `slotDuration`
  
- **POST /appointments/pending** - Get pending appointments for doctor
  - Required: `doctorId`

---

### 3. **appointmentService.js** - Appointment Management
**Base URL:** `http://localhost:8080/api/appointment`

#### Endpoints:
- **POST /book** - Book an appointment
  - Required: `patientId`, `doctorId`
  
- **PUT /cancel** - Cancel an appointment
  - Required: `appointmentId`
  
- **PUT /confirm** - Confirm an appointment
  - Required: `appointmentId`, `confirmedDateTime`

---

### 4. **prescriptionService.js** - Prescription Management
**Base URL:** `http://localhost:8080/api/prescription`

#### Endpoints:
- **POST /create** - Create a prescription
  - Required: `appointmentId`, `doctorId`, `patientId`, `medicineDetails`, `instructions`
  
- **GET /patient/{patientId}** - Get prescriptions for a patient
  
- **GET /{prescriptionId}** - Get prescription by ID

---

### 5. **medicalHistoryService.js** - Medical History Management
**Base URL:** `http://localhost:8080/api/history`

#### Endpoints:
- **POST /add** - Add medical history
  - Required: `patientId`, `doctorId`, `diseaseName`, `description`
  
- **GET /patient/{patientId}** - Get medical history for a patient
  
- **GET /{historyId}** - Get medical history by ID

---

## Components Created/Updated

### Authentication Components
1. **LoginForm.jsx** - User login with email and password
2. **RegisterForm.jsx** - User registration
3. **ForgotPasswordForm.jsx** - Password reset in two steps
4. **AuthModal.jsx** - Modal wrapper for auth forms
5. **ProfileEditForm.jsx** - User profile editing

### Pages
1. **Doctor.jsx** - Doctors listing with:
   - Search and filter functionality
   - "Be a Consultant" button with modal form
   - "Book Appointment" button with modal

### User Profile
1. **UserProfile.jsx** - User profile dropdown menu with links to:
   - My Profile
   - Settings
   - My Appointments
   - Medical Records
   - Logout

---

## Usage Examples

### Booking an Appointment
```javascript
import { appointmentService } from '../services/appointmentService';

const bookAppointment = async (patientId, doctorId) => {
  try {
    const result = await appointmentService.bookAppointment({
      patientId: parseInt(patientId),
      doctorId: parseInt(doctorId)
    });
    console.log('Appointment booked:', result);
  } catch (error) {
    console.error('Booking failed:', error);
  }
};
```

### Creating Doctor Profile
```javascript
import { getDoctorService } from '../services/doctorService';

const registerAsDoctor = async (doctorData) => {
  try {
    const result = await getDoctorService.createDoctorProfile(doctorData);
    console.log('Doctor profile created:', result);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

### Updating User Profile
```javascript
import authService from '../services/authService';

const updateProfile = async (profileData) => {
  try {
    const result = await authService.updateProfile(profileData);
    console.log('Profile updated:', result);
  } catch (error) {
    console.error('Update failed:', error);
  }
};
```

### Creating a Prescription
```javascript
import { prescriptionService } from '../services/prescriptionService';

const createPrescription = async (prescriptionData) => {
  try {
    const result = await prescriptionService.createPrescription(prescriptionData);
    console.log('Prescription created:', result);
  } catch (error) {
    console.error('Creation failed:', error);
  }
};
```

---

## Features Implemented

✅ User Registration with OTP verification
✅ User Login with session management
✅ User Profile Update with location details
✅ Password reset with email link
✅ Doctor Search & Filter (by specialization, location, language, fees)
✅ Doctor Profile Creation ("Be a Consultant")
✅ Appointment Booking with doctor selection
✅ Appointment Cancellation
✅ Appointment Confirmation with date/time
✅ Prescription Management
✅ Medical History Tracking
✅ Responsive modals for all forms
✅ Error handling and validation
✅ Loading states and user feedback

---

## Error Handling

All services include comprehensive error handling:
- Network errors
- Server validation errors
- JSON parsing errors
- User feedback through alerts and notifications

---

## Future Enhancements

1. Add doctor appointments dashboard
2. Add patient appointment history view
3. Add prescription download/print functionality
4. Add medical records document upload
5. Add appointment reminders/notifications
6. Add rating/review system for doctors
7. Add payment integration for appointments
8. Add SMS/Email notifications

---

## Notes

- All API calls use `http://localhost:8080` as the base URL
- CORS should be enabled on the backend server
- Authentication tokens are stored in localStorage
- All requests include `Content-Type: application/json` header
- All services are located in `/src/services/` directory
- All auth components are located in `/src/components/auth/` directory
