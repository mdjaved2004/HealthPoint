# User Profile - Quick Reference Guide

## What's New

### ✨ New Components

1. **UserProfile.jsx** - Dropdown user menu with profile options
2. **UserProfile.css** - Beautiful styling for user dropdown
3. **Profile.jsx** - Full profile management page
4. **Profile.css** - Styling for profile page

### 🔄 Updated Files

1. **Header.jsx** - Now shows UserProfile dropdown when logged in
2. **Header.css** - Fixed button styling issues
3. **AuthContext.jsx** - Better user data handling
4. **authService.js** - Added getUserProfile() method
5. **App.jsx** - Added /profile route

---

## How to Use

### For Users

#### View Your Profile
1. Login to the application
2. Click the avatar button (with your initials) in the top-right
3. Click "My Profile" to go to your profile page

#### Edit Your Profile
1. On the profile page, click "Edit Profile"
2. Update your information:
   - Personal details (name, phone, DOB, etc.)
   - Address information
   - Medical information (conditions, allergies, medications)
3. Click "Save Changes" to update
4. Click "Cancel" to discard changes

#### Logout
1. Click the avatar button
2. Click the red "Logout" button at the bottom of the dropdown

---

## For Developers

### API Endpoints Required

```javascript
// Backend should implement these endpoints:

POST /api/user/login
// Request: { email, password }
// Response: { token, data: { user_object } }

GET /api/user/profile
// Headers: Authorization: Bearer {token}
// Response: { user_object }

PUT /api/user/profile
// Headers: Authorization: Bearer {token}
// Body: { ...profile_data }
// Response: { updated_user_object }
```

### User Object Structure

```javascript
{
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  dateOfBirth: string,
  gender: string,
  bloodType: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  medicalConditions: string,
  allergies: string,
  medications: string
}
```

### Usage in Components

```jsx
// Import and use AuthContext
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (isAuthenticated) {
    return <div>Hello {user.firstName}!</div>;
  }
  
  return <div>Please login</div>;
}
```

### Accessing User Data

```jsx
// In any component
const { user } = useAuth();

// User data available:
- user.firstName
- user.lastName
- user.email
- user.phone
- user.dateOfBirth
- user.gender
- user.bloodType
- user.address
- user.city
- user.state
- user.zipCode
- user.medicalConditions
- user.allergies
- user.medications
```

---

## File Locations

| Component | Path |
|-----------|------|
| UserProfile | `src/components/auth/UserProfile.jsx` |
| UserProfile CSS | `src/components/auth/UserProfile.css` |
| Profile Page | `src/pages/Profile.jsx` |
| Profile CSS | `src/pages/Profile.css` |
| Updated Header | `src/components/Header.jsx` |
| Updated AuthContext | `src/contexts/AuthContext.jsx` |
| Updated authService | `src/services/authService.js` |

---

## Key CSS Classes

### UserProfile Component
- `.user-profile-container` - Main wrapper
- `.user-profile-btn` - Profile button in header
- `.user-avatar` - Avatar circle with initials
- `.profile-dropdown` - Dropdown menu
- `.profile-menu-item` - Menu items
- `.profile-logout-btn` - Logout button

### Profile Page
- `.profile-page` - Page wrapper
- `.profile-header-section` - Header with user info
- `.form-section` - Form sections
- `.profile-form` - Main form
- `.form-control` - Input fields

---

## Styling

### Colors Used
- Primary Blue: `#0066cc`
- Dark Blue: `#0052a3`
- Darker Blue: `#003d7a`
- Danger Red: `#dc3545`
- Light Gray: `#f8f9fa`

### Breakpoints
- Desktop: 768px and above
- Tablet: 480px - 768px
- Mobile: Below 480px

---

## Features Checklist

- [x] User profile dropdown in header
- [x] User avatar with initials
- [x] Profile dropdown menu
- [x] Full profile page
- [x] Edit profile functionality
- [x] Personal information management
- [x] Address management
- [x] Medical history tracking
- [x] Responsive design
- [x] Mobile optimization
- [x] Professional styling
- [x] Authentication integration
- [x] Logout functionality
- [x] Form validation ready
- [x] Error handling ready

---

## Next Steps (Optional Enhancements)

1. **Settings Page** - User preferences and notifications
2. **Appointments Page** - View and book appointments
3. **Medical Records** - View past medical records
4. **Profile Picture** - Add user photo upload
5. **Password Change** - Change password functionality
6. **Two-Factor Auth** - Additional security
7. **Activity Log** - Track account activity
8. **Notifications** - Push/email preferences
9. **Data Export** - Download user data
10. **Account Deletion** - Remove account option

---

## Troubleshooting

### User not appearing after login
- Check that backend returns user data in login response
- Ensure user data is stored in AuthContext
- Verify localStorage token is set

### Profile page not loading
- Ensure /profile route is added to App.jsx
- Check that Profile component is imported
- Verify user is authenticated (check AuthContext)

### Styling issues
- Clear browser cache
- Ensure CSS files are imported correctly
- Check for CSS specificity conflicts
- Use browser DevTools to inspect elements

### Dropdown not working
- Check that UserProfile component is imported
- Verify click-outside handler is working
- Check browser console for errors
- Ensure AuthContext is wrapped around app

---

## Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers
- ✅ IE 11 (with polyfills)

---

## Performance Notes

- UserProfile dropdown uses React.useRef for click detection
- AuthContext memoizes user data
- Profile page uses lazy form rendering
- CSS uses optimized gradients
- Responsive images and media queries

---

## Security Notes

- Auth token stored in localStorage
- Bearer token used for API requests
- Email field is read-only (cannot change)
- Logout clears all auth data
- Protected API endpoints require token
- CORS handled by backend

---

## Support

For issues or questions about the user profile functionality:
1. Check the Visual Guide document
2. Review the Implementation Summary
3. Check browser console for errors
4. Verify backend API endpoints
5. Test with provided example data

---

**Last Updated**: January 20, 2026
**Version**: 1.0.0
