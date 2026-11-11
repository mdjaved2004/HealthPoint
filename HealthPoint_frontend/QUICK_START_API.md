# Quick Start Guide - API Integration

## Prerequisites
- Backend server running on `http://localhost:8080`
- All Spring Boot endpoints accessible
- CORS enabled on backend

## Accessing Features

### 1. User Authentication
**Location:** Auth Modal (Login/Register/Forgot Password)

#### Register a New Account
1. Click "Register" button in header
2. Fill in required fields:
   - Name
   - Email
   - Username
   - Mobile Number
   - Password
   - Confirm Password
3. Click "Register"
4. Enter OTP received
5. Login with your credentials

#### Login
1. Click "Login" button
2. Enter email and password
3. Check "Remember me" if desired
4. Click "Login"

#### Reset Password
1. Click "Login"
2. Click "Forgot Password?"
3. Enter your email address
4. Enter your username
5. Enter new password
6. Confirm password
7. Click "Reset Password"

### 2. View Doctors
**Location:** Doctor Page (`/doctors`)

#### Features:
- **Search:** Use filters to find doctors by:
  - Specialization
  - Hospital/Location
  - Language
  - Fees range

- **Sort:** Sort results by:
  - Name (A-Z)
  - Specialization
  - Location
  - Fees (Low to High or High to Low)
  - Rating (High to Low)

### 3. Book an Appointment
**Location:** Doctor Page - "Book Appointment" button

1. Click "Book Appointment" button on any doctor card
2. Modal will open showing doctor details
3. Enter your Patient ID
4. Click "Book Appointment"
5. Confirmation message will appear

**Important:** You must have a patient ID (register as a patient first)

### 4. Be a Consultant
**Location:** Doctor Page - "Be a Consultant" button (top of page)

1. Click "Be a Consultant" button
2. Fill in all required fields:
   - Specialization (e.g., Cardiologist)
   - License Number
   - Years of Experience
   - Description
   - Hospital Name
   - Consultation Fees
   - Languages (comma-separated, e.g., English,Hindi)
   - Available Start Time (24-hour format)
   - Available End Time (24-hour format)
   - Slot Duration (in minutes)
3. Click "Submit"
4. Success message will confirm registration

### 5. Update User Profile
**Location:** User Profile Dropdown - "My Profile"

1. Click user avatar in top-right corner
2. Click "My Profile"
3. Update your information:
   - Email
   - Full Name
   - Mobile Number
   - State
   - District
   - City
   - Address
4. Click "Update Profile"
5. Success message confirms update

### 6. Logout
**Location:** User Profile Dropdown

1. Click user avatar in top-right corner
2. Click "Logout"
3. You will be logged out and redirected to home page

---

## API Response Format

All APIs return data in the following format:

### Success Response
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    // Response data object
  },
  "timestamp": "2026-03-10T10:30:00Z"
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "error": "Specific error details",
  "timestamp": "2026-03-10T10:30:00Z"
}
```

---

## Common Issues & Solutions

### Issue: "Backend not connecting"
**Solution:** Ensure backend server is running on `http://localhost:8080`

### Issue: "CORS Error"
**Solution:** Verify CORS is enabled in Spring Boot backend configuration

### Issue: "Invalid OTP"
**Solution:** Ensure you copy the exact OTP from email. Check expiration time.

### Issue: "Appointment booking fails"
**Solution:** 
- Verify patient ID is correct
- Ensure doctor ID exists
- Check if patient is registered in the system

### Issue: "Doctor profile creation fails"
**Solution:**
- Verify all required fields are filled
- Check phone number format
- Ensure license number follows backend validation rules

---

## Testing with Mock Data

### Test Patient ID: 1, 2
### Test Doctor IDs: 1-6

**Sample Appointment Data:**
```json
{
  "patientId": 1,
  "doctorId": 2
}
```

**Sample Doctor Registration:**
```json
{
  "specialization": "Cardiologist",
  "licenseNumber": "LIC123454",
  "experience": 10,
  "description": "Heart specialist",
  "hospitalName": "City Hospital",
  "fees": 500,
  "languages": "English,Hindi",
  "availableStartTime": "09:00",
  "availableEndTime": "17:00",
  "slotDuration": 20
}
```

---

## Local Storage

The application stores following in localStorage:
- `authToken` - User authentication token
- `loginTime` - Timestamp of last login
- `rememberEmail` - Email if "Remember me" was checked

---

## Browser DevTools Tips

### Debugging API Calls
1. Open DevTools (F12)
2. Go to Network tab
3. Perform an action
4. Look for API request
5. Check request/response in Inspector

### Checking Local Storage
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Local Storage"
4. Select the domain
5. View stored data

### Console Errors
All errors are logged to console with:
- Error message
- Stack trace
- API endpoint (if applicable)

---

## Performance Tips

1. **List/Search Performance:**
   - Use filters to reduce data load
   - Pagination implemented for large lists

2. **Image Loading:**
   - Doctor images load from `/assets/img/`
   - Placeholder shown if image fails

3. **Form Validation:**
   - All forms validate before submission
   - Error messages shown in real-time

---

## Security Notes

⚠️ **Important:**
- Passwords are sent via HTTPS (in production)
- Tokens stored in localStorage (vulnerable in XSS attacks)
- Consider using httpOnly cookies for production
- Always validate data on backend
- Implement rate limiting for registration/login

---

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend server is running
3. Check API endpoint URLs match backend routes
4. Review error messages carefully
5. Check backend logs for detailed errors

---

Last Updated: March 10, 2026
Version: 1.0.0
