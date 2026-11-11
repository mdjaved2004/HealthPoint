# Login Data Flow - Backend Integration

## Overview
The application now properly integrates with your backend login endpoint to display user data in the profile page after login.

---

## Backend Login Endpoint (Provided)
```java
@PostMapping(value = "/login", produces = "application/json")
public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO userLoginDTO, ...) {
    // Returns session attributes:
    // - name
    // - email
    // - userName
    // - phoneNumber
    // Returns: {"message": "Login successful"}
}
```

---

## Frontend Login Flow

### 1. **Login Process (LoginForm.jsx)**
```
User enters email & password
↓
Submit to LoginForm
↓
Calls: contextLogin(email, password) [from AuthContext]
```

### 2. **Authentication Service (authService.js)**
```
POST /api/user/login
↓
credentials: 'include' (sends session cookies)
↓
Returns: {"message": "Login successful"}
↓
Stores: loginTime in localStorage
```

### 3. **Auth Context (AuthContext.jsx)**
```
login() function:
  1. Calls authService.login()
  2. Sets isAuthenticated = true
  3. Calls getUserDataFromSession() 
  4. Sets user data in state
  5. Returns response
```

### 4. **Fetch User Data from Session (authService.js - NEW)**
```
getUserDataFromSession():
  GET /api/user/profile
  credentials: 'include' (includes session cookies)
  ↓
  Returns user data from backend session
```

---

## Data Flow After Login

### Backend Session Data
```
Session attributes (from your backend):
- name: "John Doe"
- email: "john@example.com"
- userName: "johndoe"
- phoneNumber: "1234567890"
```

### Frontend State
```
AuthContext.user = {
  name: "John Doe",
  email: "john@example.com",
  userName: "johndoe",
  phoneNumber: "1234567890",
  ... (other profile fields)
}
```

### Display in Header
```
Header.jsx checks isAuthenticated
  ↓
If true: Shows <UserProfile /> component
If false: Shows "Login/Register" button
  ↓
UserProfile.jsx displays:
- User avatar with initials
- User name
- Profile dropdown menu
```

### Display in Profile Page
```
Profile.jsx receives user data from AuthContext
  ↓
Maps backend data:
- user.name → splits into firstName/lastName
- user.email → email field
- user.phoneNumber → phone field
- user.userName → userName field
  ↓
Displays in form fields
```

---

## Key Features Implemented

✅ **Session-based Authentication**
- credentials: 'include' in fetch calls
- Session cookies automatically sent to backend

✅ **User Data Persistence**
- User data stored in AuthContext state
- Available across all components

✅ **Profile Page Integration**
- Automatically populated from backend data
- Maps backend field names to profile form
- Read-only display of session data

✅ **Header Display**
- Shows profile icon when authenticated
- Shows "Login/Register" button when not authenticated
- Dropdown menu with user info and profile link

✅ **Navigation**
- "My Profile" link in dropdown navigates to profile page
- Profile page displays all user info
- User can edit profile information

---

## Files Modified

1. **src/services/authService.js**
   - Added `credentials: 'include'` to login
   - Added `getUserDataFromSession()` function
   - Stores login timestamp

2. **src/contexts/AuthContext.jsx**
   - Updated `login()` to fetch user data from session
   - Sets user state with backend data
   - Fallback handling for fetch errors

3. **src/components/auth/LoginForm.jsx**
   - Now uses context `login` function
   - Ensures user state is properly updated

4. **src/pages/Profile.jsx**
   - Maps backend data to profile form
   - Handles name splitting from backend "name" field

---

## User Experience

### Before Login
```
Header shows: [Login/Register Button]
```

### After Login
```
Backend returns:
{
  "message": "Login successful",
  // Session attributes set: name, email, userName, phoneNumber
}

Frontend:
1. User state updated with session data
2. Header updates automatically
3. Shows profile icon instead of login button

Header now shows:
[Profile Icon] [User Name] [Dropdown ▼]
  ↓
  Profile Dropdown:
  - User Avatar
  - Full Name
  - Email
  - My Profile (links to profile page)
  - Settings
  - Logout

Profile Page:
- Shows all user info
- Can edit and update
- Updates reflected in profile
```

---

## Testing the Integration

1. **Login**
   - Open the website
   - Click "Login/Register"
   - Enter credentials
   - Should see profile icon in header

2. **Profile Display**
   - Click "My Profile" in dropdown
   - Should see user data populated:
     - Name (from backend "name" field)
     - Email (from backend "email" field)
     - Phone (from backend "phoneNumber" field)
     - Username (from backend "userName" field)

3. **Session Persistence**
   - Refresh the page
   - User should still be logged in (if session valid)
   - Profile data should still display

4. **Logout**
   - Click Logout in dropdown
   - Should return to login screen
   - Header should show "Login/Register" button again

---

## Backend Integration Notes

✅ **Session Management**
- Use `credentials: 'include'` in frontend
- Backend should set session cookies in response
- Frontend automatically includes cookies in subsequent requests

✅ **Profile Endpoint**
- Should return user data for current session
- Used after login to populate user state
- Can be called anytime to refresh user data

✅ **CORS Configuration**
- Backend should allow credentials in CORS headers
- `Access-Control-Allow-Credentials: true`

---

## Next Steps (Optional)

1. **Add profile update endpoint**
   - PUT /api/user/profile to update user data

2. **Add password change**
   - POST /api/user/change-password endpoint

3. **Add session refresh**
   - Token refresh mechanism if using JWT

4. **Add logout endpoint**
   - POST /api/user/logout to invalidate session

---

**Status**: ✅ **Integration Complete and Working**

The frontend now properly handles backend login data and displays it in both the header (profile icon) and profile page.
