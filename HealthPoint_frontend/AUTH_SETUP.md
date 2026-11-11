# Authentication System Documentation

## Overview
This authentication system provides login and registration functionality for the Medical Center React application. It includes email verification via OTP and secure password handling.

## Features
- **User Registration** with validation
- **Email OTP Verification** during signup
- **User Login** with token management
- **Logout** functionality
- **Remember Me** option for login
- **Responsive Design** for desktop and mobile

## Backend API Endpoints

### Register User
**Endpoint:** `POST http://localhost:8080/api/user/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "userName": "johndoe",
  "mobileNumber": "9876543210",
  "password": "Password@123",
  "confirmPassword": "Password@123"
}
```

**Expected Response:**
```json
{
  "message": "Registration successful. OTP sent to your email.",
  "data": {
    "userId": "uuid",
    "email": "john@example.com"
  }
}
```

### Verify OTP
**Endpoint:** `POST http://localhost:8080/api/user/verify-otp`

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Expected Response:**
```json
{
  "message": "Email verified successfully.",
  "data": {
    "userId": "uuid"
  }
}
```

### Login User
**Endpoint:** `POST http://localhost:8080/api/user/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "data": {
    "userId": "uuid",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

## File Structure

```
src/
├── components/
│   ├── Header.jsx                 # Main header component with auth button
│   ├── Header.css                 # Header styles
│   └── auth/
│       ├── AuthModal.jsx          # Main modal component
│       ├── LoginForm.jsx          # Login form component
│       ├── RegisterForm.jsx       # Registration form component
│       └── AuthModal.css          # Auth modal styles
├── services/
│   └── authService.js             # Authentication API service
```

## Usage

### Opening Auth Modal
The authentication modal is triggered by clicking the "Login/Register" button in the header. Once clicked, it opens a modal with two tabs:

1. **Login Tab** - For existing users to log in
2. **Register Tab** - For new users to create an account

### Registration Flow
1. User clicks "Login/Register" button
2. Fills in registration form (name, email, username, mobile, password)
3. Clicks "Register"
4. OTP is sent to their email
5. User enters OTP and verifies
6. Account is created successfully
7. User is redirected to login tab

### Login Flow
1. User enters email and password
2. Clicks "Login"
3. Authentication token is stored in localStorage
4. Header changes to show "Welcome back!" and "Logout" button
5. User is logged in

### Logout
Click the "Logout" button in the header to:
- Remove authentication token from localStorage
- Update header to show "Login/Register" button again
- Clear user session

## Data Storage

### localStorage Keys
- **authToken** - JWT token from login response
- **rememberEmail** - Saved email if "Remember me" is checked

## Form Validation

### Register Form
- **Name**: Required, non-empty
- **Email**: Required, valid email format
- **Username**: Required, non-empty
- **Mobile Number**: Required, exactly 10 digits
- **Password**: Required, minimum 8 characters
- **Confirm Password**: Must match password field

### Login Form
- **Email**: Required, valid email format
- **Password**: Required, non-empty

## Error Handling

All forms include comprehensive error messages for:
- Validation errors
- Network errors
- API errors

Success messages are also displayed to inform users of actions like OTP verification.

## Security Considerations

1. **Passwords** are never logged or stored in localStorage
2. **JWT tokens** are stored in localStorage (consider upgrading to HttpOnly cookies for production)
3. **Password confirmation** is required during registration
4. **Email verification** is mandatory before account activation
5. **OTP validation** prevents unauthorized account creation

## Styling

The authentication system includes:
- Modern, clean design matching the Medical Center theme
- Responsive layout for mobile and desktop
- Smooth animations and transitions
- Clear visual feedback for user interactions
- Consistent color scheme (primary blue #0066cc)

## Customization

### Change Primary Color
Edit `src/components/auth/AuthModal.css` and `src/components/Header.css`:
```css
/* Replace #0066cc with your preferred color */
background-color: #0066cc;
```

### Modify Form Fields
Edit the respective form components in `src/components/auth/`:
- Add/remove fields in state
- Add/remove input elements in JSX
- Update validation logic
- Ensure backend API expects the same field names

### API Endpoint
To change the API endpoint, edit `src/services/authService.js`:
```javascript
const API_BASE_URL = 'http://your-api-url/api/user';
```

## Testing

### Test Registration
1. Fill all fields with valid data
2. Submit form
3. Check email for OTP
4. Enter OTP and verify
5. Login with the new account

### Test Login
1. Use previously registered credentials
2. Login should succeed
3. Check localStorage for authToken

### Test Logout
1. After login, click Logout
2. Header should show "Login/Register" again
3. Check localStorage to confirm authToken is removed

## Troubleshooting

### "OTP verification failed"
- Ensure the OTP in your email matches exactly
- OTP might have expired (check backend OTP expiry time)
- Verify the email was received

### "Login failed"
- Confirm credentials are correct
- Check that backend API is running on http://localhost:8080
- Verify network connectivity

### Modal not opening
- Ensure AuthModal component is properly imported in Header
- Check browser console for JavaScript errors
- Verify button onClick handler is working

### Styles not applying
- Clear browser cache
- Ensure CSS files are properly imported
- Check for CSS class name mismatches

## Future Enhancements

1. Add "Forgot Password" functionality
2. Implement password reset via email
3. Add social login (Google, Facebook)
4. Two-factor authentication (2FA)
5. Session timeout warning
6. User profile management
7. Email change functionality
8. Phone number verification via SMS

## Dependencies

- React 18+
- React Router (for navigation)
- FontAwesome (for icons)
- Bootstrap classes (for styling)

## Notes

- The authentication system uses localStorage for token persistence
- Consider implementing a refresh token strategy for production
- OTP expiry time should be configured on the backend (typically 5-10 minutes)
- Implement HTTPS in production for secure credential transmission
