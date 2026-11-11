# User Profile Functionality - Visual Guide

## How It Works

### 1. **Login/Register State**

#### When NOT Logged In (Desktop):
```
┌─────────────────────────────────────────────────────────┐
│ Medical Center      Home About Doctors Dept. Blog Contact│ Login/Register ▼
└─────────────────────────────────────────────────────────┘
                         ↓ Click on "Login/Register"
                    Opens Auth Modal (Login/Register Form)
```

#### When NOT Logged In (Mobile):
```
┌─────────────────────────────────┐
│ Medical Center            ☰     │
├─────────────────────────────────┤
│ Home                            │
│ About                           │
│ Doctors                         │
│ Department                      │
│ Blog                            │
│ Contact                         │
│ [Login/Register Button]         │
└─────────────────────────────────┘
```

---

### 2. **User Profile State (After Login)**

#### Desktop View - Header:
```
┌─────────────────────────────────────────────────────────┐
│ Medical Center      Home About Doctors Dept. Blog Contact│ [JD ▼]
└─────────────────────────────────────────────────────────┘
                                    ↓ Hover/Click Avatar
                         ┌──────────────────────────────┐
                         │ [JD] John Doe                 │
                         │      john@example.com         │
                         ├──────────────────────────────┤
                         │ 👤 My Profile                │
                         │ ⚙️  Settings                 │
                         │ 📅 My Appointments           │
                         │ 📄 Medical Records            │
                         ├──────────────────────────────┤
                         │ [Sign Out]                   │
                         └──────────────────────────────┘
```

#### Mobile View - Header:
```
┌──────────────────────────────────────┐
│ Medical Center         [JD ▼]  ☰    │
├──────────────────────────────────────┤
│ [Same dropdown as desktop]           │
└──────────────────────────────────────┘
```

---

### 3. **User Profile Page** (`/profile`)

When clicking "My Profile" from the dropdown:

```
╔════════════════════════════════════════════════════════════╗
║                   [BLUE HEADER SECTION]                    ║
║  [JD]  John Doe                                [Edit Profile]║
║        john@example.com                                    ║
╠════════════════════════════════════════════════════════════╣
║                  PERSONAL INFORMATION                      ║
║  First Name: John      │ Last Name: Doe                    ║
║  Email: john@...       │ Phone: (555) 123-4567             ║
║  Date of Birth: 1990.. │ Gender: Male                      ║
║  Blood Type: O+        │                                   ║
║─────────────────────────────────────────────────────────────║
║                 ADDRESS INFORMATION                        ║
║  Address: 123 Main Street                                  ║
║  City: New York        │ State: NY   │ Zip: 10001          ║
║─────────────────────────────────────────────────────────────║
║                 MEDICAL INFORMATION                        ║
║  Medical Conditions:                                       ║
║  [Text Area]                                               ║
║  Allergies:                                                ║
║  [Text Area]                                               ║
║  Current Medications:                                      ║
║  [Text Area]                                               ║
║─────────────────────────────────────────────────────────────║
║  [Save Changes]  [Cancel]                     [Logout]     ║
╚════════════════════════════════════════════════════════════╝
```

---

### 4. **Edit Mode**

Click "Edit Profile" button:

```
Normal Mode:                    Edit Mode:
┌─────────────┐               ┌─────────────┐
│ Input Field │               │ Input Field │
│ (Disabled)  │    ──────→   │ (Enabled)   │
│ Read-only   │               │ White bg    │
└─────────────┘               └─────────────┘

All fields become editable
Cancel/Save buttons appear at bottom
```

---

## Component Architecture

```
App.jsx
├── Router
│   ├── Routes
│   │   ├── Home
│   │   ├── About
│   │   ├── ... other pages
│   │   └── Profile (NEW)
│   │       └── Uses AuthContext
│   │
│   └── Header.jsx
│       ├── Uses AuthContext
│       ├── Shows UserProfile (if authenticated)
│       │   └── UserProfile.jsx (NEW)
│       │       ├── Dropdown Menu
│       │       └── Navigation
│       └── Shows Login/Register (if not authenticated)
│           └── AuthModal
│
AuthContext.jsx (Central Auth State)
├── user (User data)
├── isAuthenticated (Boolean)
├── login() (Updates user data)
├── logout() (Clears user data)
└── register()

authService.js
├── login()
├── register()
├── logout()
├── getUserProfile() (NEW)
└── getAuthToken()
```

---

## Data Flow

### On User Login:

```
1. User enters email/password in Login Form
        ↓
2. LoginForm calls authService.login(email, password)
        ↓
3. authService sends POST to /api/user/login
        ↓
4. Backend returns { token, data: {...user info...} }
        ↓
5. AuthContext.login() is called
        ↓
6. User data stored in context state
        ↓
7. Token stored in localStorage
        ↓
8. Header re-renders and shows UserProfile instead of Login button
        ↓
9. User sees avatar with initials
```

### On Profile Page Load:

```
1. User navigates to /profile
        ↓
2. Profile component mounts
        ↓
3. useAuth() hook gets current user from AuthContext
        ↓
4. Profile form populated with user data
        ↓
5. Fields disabled by default (view mode)
        ↓
6. User clicks "Edit Profile"
        ↓
7. Fields enabled for editing
        ↓
8. User modifies data and clicks "Save"
        ↓
9. Profile calls authService.updateProfile()
        ↓
10. Sends PUT request with updated data to /api/user/profile
        ↓
11. Backend updates user and returns updated user object
        ↓
12. Success message shown
        ↓
13. Profile page updates with new data
```

---

## Styling Color Scheme

### Primary Colors:
- **Blue**: #0066cc (Buttons, Links)
- **Dark Blue**: #0052a3 (Hover states)
- **Darker Blue**: #003d7a (Active states)
- **Red**: #dc3545 (Logout/Danger)
- **Light Background**: #f8f9fa (Page background)
- **White**: #ffffff (Forms, Cards)

### Gradients:
- **Button Gradient**: linear-gradient(135deg, #0066cc, #0052a3)
- **Header Gradient**: linear-gradient(135deg, #f0f4ff, #f9fbff)

---

## File Structure

```
src/
├── components/
│   ├── Header.jsx (UPDATED)
│   ├── Header.css (UPDATED)
│   └── auth/
│       ├── UserProfile.jsx (NEW)
│       ├── UserProfile.css (NEW)
│       ├── AuthModal.jsx
│       ├── LoginForm.jsx
│       └── RegisterForm.jsx
├── pages/
│   ├── Profile.jsx (NEW)
│   └── Profile.css (NEW)
├── contexts/
│   └── AuthContext.jsx (UPDATED)
├── services/
│   └── authService.js (UPDATED)
└── App.jsx (UPDATED - Added /profile route)
```

---

## User Flow Diagram

```
┌─────────────┐
│  Landing    │
│   Page      │
└──────┬──────┘
       │
       ├─────────────────────────┐
       ↓                         ↓
   ┌────────────┐         ┌──────────────┐
   │ Not Logged │         │ Logged In    │
   │    In      │         │              │
   └─────┬──────┘         └──────┬───────┘
         │                       │
         ↓                       ↓
   ┌─────────────┐        ┌────────────────┐
   │Login/Register│       │ UserProfile     │
   │   Button     │       │  Dropdown       │
   └─────┬────────┘       └────────┬────────┘
         │                         │
         ↓                         ├─────────→ My Profile
   ┌──────────────┐               │
   │ Auth Modal   │               ├─────────→ Settings
   │  (Login/Reg) │               │
   └──────┬───────┘               ├─────────→ Appointments
          │                       │
          ↓                       ├─────────→ Medical Records
   ┌──────────────┐               │
   │ Redirect to  │               ↓
   │ /profile     │         ┌────────────────┐
   └──────┬───────┘         │ Profile Page   │
          │                 │   (/profile)   │
          ↓                 └────────────────┘
   ┌──────────────┐
   │ Profile Page │
   │  (/profile)  │
   └──────────────┘
```

---

## Key Features Summary

✅ **Authentication State**
- Centralized in AuthContext
- Persists via localStorage token
- Real-time UI updates

✅ **User Profile Dropdown**
- Professional design with gradient
- Quick access to key features
- One-click logout

✅ **Full Profile Management**
- View and edit personal info
- Medical history tracking
- Address management
- Form validation

✅ **Responsive Design**
- Desktop: Full features visible
- Tablet: Compact layout
- Mobile: Touch-optimized

✅ **Security**
- Bearer token authentication
- Protected endpoints
- Secure logout

---

## Troubleshooting

### Issue: Avatar not showing initials
**Solution**: Check that user.firstName and user.lastName are being stored

### Issue: Profile page blank after login
**Solution**: Ensure user data is being returned from login endpoint

### Issue: Dropdown closes immediately
**Solution**: Click-outside handler is working correctly, feature intended

### Issue: Button text appearing in background
**Solution**: Fixed with !important flags in Header.css
