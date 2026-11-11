# Quick Start Guide - Authentication System

## 🚀 Installation Steps

### 1. Verify Files Are Created
The following files have been created in your project:

```
✓ src/services/authService.js
✓ src/components/auth/AuthModal.jsx
✓ src/components/auth/LoginForm.jsx
✓ src/components/auth/RegisterForm.jsx
✓ src/components/auth/AuthModal.css
✓ src/components/Header.jsx (updated)
✓ src/components/Header.css
✓ src/contexts/AuthContext.jsx (optional)
✓ AUTH_SETUP.md (documentation)
✓ AUTH_IMPLEMENTATION.md (full guide)
```

### 2. Install Dependencies
```bash
# No additional dependencies required!
# The auth system uses only React and built-in browser APIs
```

### 3. Update Backend API URL (if needed)
Edit `src/services/authService.js` line 1:
```javascript
const API_BASE_URL = 'http://localhost:8080/api/user';
// Change http://localhost:8080 to your backend URL
```

### 4. (Optional) Set Up Auth Context
If you want global auth state management:

Edit `src/main.jsx`:
```jsx
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
```

### 5. Verify Backend Endpoints
Ensure your backend has these endpoints:
- `POST /api/user/register`
- `POST /api/user/verify-otp`
- `POST /api/user/login`

## 🎯 Testing

### Test Registration:
1. Click **"Login/Register"** button in header
2. Click **"Register"** tab
3. Fill form with test data:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Username: `johndoe`
   - Mobile: `9876543210`
   - Password: `Password@123`
   - Confirm Password: `Password@123`
4. Click **"Register"**
5. Wait for OTP email (check spam folder)
6. Enter OTP and click **"Verify OTP"**
7. Success message appears and redirects to login

### Test Login:
1. Click **"Login/Register"** button
2. Enter email and password from registration
3. Click **"Login"**
4. Header updates with "Welcome back!" and "Logout" button
5. Modal closes

### Test Logout:
1. Click **"Logout"** button in header
2. Header returns to "Login/Register" button
3. Check localStorage - `authToken` should be removed

## 🔍 Browser DevTools Tips

### Check Authentication Status:
```javascript
// Open browser console and run:
localStorage.getItem('authToken')  // Returns token if logged in
localStorage.getItem('rememberEmail')  // Returns email if "Remember me" was checked
```

### Clear All Auth Data:
```javascript
// In browser console:
localStorage.removeItem('authToken');
localStorage.removeItem('rememberEmail');
```

### Test API Endpoints:
```javascript
// Test register endpoint:
fetch('http://localhost:8080/api/user/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    userName: 'testuser',
    mobileNumber: '9876543210',
    password: 'Password@123',
    confirmPassword: 'Password@123'
  })
}).then(r => r.json()).then(d => console.log(d));
```

## 📝 Important Notes

### Data Format
The backend expects this exact data format for registration:
```json
{
  "name": "string",
  "email": "string",
  "userName": "string",        // ← Note: camelCase
  "mobileNumber": "string",    // ← Note: camelCase
  "password": "string",
  "confirmPassword": "string"
}
```

### OTP Verification
After registration, the OTP step:
- Expects OTP to be sent to user's email
- OTP field accepts 6-digit code
- Should validate OTP against backend

### Token Storage
- Login tokens are stored in `localStorage` with key `authToken`
- For production, consider using HttpOnly cookies instead
- Token is automatically included in subsequent API calls if needed

## 🎨 Customization Examples

### Change Button Color:
Edit `src/components/Header.css`:
```css
.header-btn {
  background-color: #0066cc;  /* Change this color */
}
```

### Add New Form Field:
Edit `src/components/auth/RegisterForm.jsx`:

1. Add to state:
```jsx
const [formData, setFormData] = useState({
  // ... existing fields ...
  newField: '',  // Add this
});
```

2. Add input:
```jsx
<div className="form-group">
  <input
    type="text"
    name="newField"
    placeholder="New Field"
    value={formData.newField}
    onChange={handleInputChange}
    className="form-control"
  />
</div>
```

3. Add validation:
```jsx
if (!formData.newField.trim()) {
  setError('New Field is required');
  return false;
}
```

### Change OTP Message:
Edit `src/components/auth/RegisterForm.jsx` around line 85:
```jsx
setSuccess('Your custom OTP message here');
```

## ⚠️ Common Issues & Solutions

### "Cannot find module 'authService'"
- Ensure `src/services/authService.js` exists
- Check the import path matches your file structure

### Modal opens but forms don't appear
- Check browser console for JavaScript errors
- Verify all auth component files exist
- Clear browser cache

### API calls return 404
- Verify backend is running on http://localhost:8080
- Check endpoint paths match exactly
- Look at Network tab in browser DevTools

### OTP not received
- Check spam/junk email folder
- Verify backend is configured to send emails
- Check backend logs for email sending errors

### Login/Register button not visible
- Check if Header component is properly imported in App.jsx
- Verify CSS is loading (check Network tab in DevTools)
- Check for CSS class conflicts

## 🔐 Security Checklist

- [ ] Backend validates all inputs
- [ ] Backend hashes passwords before storing
- [ ] Backend implements OTP expiry
- [ ] CORS is properly configured
- [ ] HTTPS is used in production
- [ ] Sensitive data is not logged
- [ ] Rate limiting is implemented for auth endpoints
- [ ] JWT tokens have reasonable expiry times

## 📊 API Response Format

Your backend responses should follow this format:

**Success Response:**
```json
{
  "message": "Success message",
  "data": {
    "userId": "...",
    "email": "..."
  },
  "token": "jwt_token_string"  // For login only
}
```

**Error Response:**
```json
{
  "message": "Error description"
}
```

The frontend will read the `message` field for display and `token` field for storing JWT.

## 🚨 Debugging

Enable detailed logging by adding this to `authService.js`:

```javascript
// Add this after each fetch response:
console.log('Response:', response);
console.log('Data:', data);
```

Or use browser DevTools:
1. Open DevTools (F12)
2. Go to Network tab
3. Perform login/register
4. Click on API request
5. View Request and Response details

## 📞 Getting Help

If something doesn't work:
1. Check the detailed documentation in `AUTH_SETUP.md`
2. Review `AUTH_IMPLEMENTATION.md` for complete setup guide
3. Check browser console for error messages
4. Check Network tab for API responses
5. Verify backend is running and API endpoints exist

## ✨ Next Features to Add

1. **Forgot Password Flow** - Reset password via email link
2. **User Profile Page** - Display and edit user information
3. **Social Login** - Google/Facebook authentication
4. **Two-Factor Authentication** - Additional security layer
5. **Role-Based Access** - Admin, Doctor, Patient roles
6. **Dashboard** - Personalized user dashboard

---

**You're all set!** The authentication system is ready to use. Click the "Login/Register" button in your header to get started.
