# Authentication System - Component & Flow Diagram

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    React App (Frontend)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────────────┐  │
│  │   Header.jsx     │         │  AuthContext (optional)  │  │
│  │                  │◄────────┤                          │  │
│  │ ┌──────────────┐ │         │ - Global Auth State      │  │
│  │ │ Login Button │ │         │ - useAuth Hook          │  │
│  │ └──────┬───────┘ │         └──────────────────────────┘  │
│  └────────┼──────────┘                                       │
│           │                                                   │
│           │ onClick                                           │
│           ▼                                                   │
│  ┌─────────────────────────────┐                            │
│  │    AuthModal.jsx            │                            │
│  │  ┌─────────────────────────┐│                            │
│  │  │  LoginForm.jsx          ││                            │
│  │  │  ┌────────────────────┐ ││                            │
│  │  │  │ Email Input        │ ││                            │
│  │  │  │ Password Input     │ ││                            │
│  │  │  │ Remember Me Check  │ ││                            │
│  │  │  │ Login Button       │ ││                            │
│  │  │  └────────────────────┘ ││                            │
│  │  └─────────────────────────┘│                            │
│  │  ┌─────────────────────────┐│                            │
│  │  │  RegisterForm.jsx       ││                            │
│  │  │  ┌────────────────────┐ ││                            │
│  │  │  │ Step 1: Register   │ ││                            │
│  │  │  │ - Name             │ ││                            │
│  │  │  │ - Email            │ ││                            │
│  │  │  │ - Username         │ ││                            │
│  │  │  │ - Mobile Number    │ ││                            │
│  │  │  │ - Password         │ ││                            │
│  │  │  │ - Confirm Password │ ││                            │
│  │  │  └────────────────────┘ ││                            │
│  │  │  ┌────────────────────┐ ││                            │
│  │  │  │ Step 2: OTP        │ ││                            │
│  │  │  │ - OTP Input        │ ││                            │
│  │  │  │ - Verify Button    │ ││                            │
│  │  │  └────────────────────┘ ││                            │
│  │  └─────────────────────────┘│                            │
│  └─────────────────────────────┘                            │
│           │                                                   │
│           │ API Calls                                         │
│           ▼                                                   │
│  ┌─────────────────────────────┐                            │
│  │  authService.js             │                            │
│  │  ┌────────────────────────┐ │                            │
│  │  │ register()             │ │                            │
│  │  │ login()                │ │                            │
│  │  │ verifyOtp()            │ │                            │
│  │  │ logout()               │ │                            │
│  │  │ getAuthToken()         │ │                            │
│  │  │ isAuthenticated()      │ │                            │
│  │  └────────────────────────┘ │                            │
│  └─────────────────────────────┘                            │
│           │                                                   │
│           │ HTTP Requests                                     │
│           ▼                                                   │
│  ┌─────────────────────────────┐                            │
│  │  localStorage               │                            │
│  │  - authToken                │                            │
│  │  - rememberEmail            │                            │
│  └─────────────────────────────┘                            │
└─────────────────────────────────────────────────────────────┘
           │
           │ Network Calls
           ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend API (Node.js/Express)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  POST /api/user/register                                     │
│  ├─ Validate input                                           │
│  ├─ Hash password                                            │
│  ├─ Create user in DB                                        │
│  ├─ Generate OTP                                             │
│  └─ Send OTP via email                                       │
│                                                               │
│  POST /api/user/verify-otp                                   │
│  ├─ Verify OTP code                                          │
│  ├─ Mark email as verified                                   │
│  └─ Activate user account                                    │
│                                                               │
│  POST /api/user/login                                        │
│  ├─ Check email exists                                       │
│  ├─ Verify password hash                                     │
│  ├─ Generate JWT token                                       │
│  └─ Return token and user data                               │
│                                                               │
│  ┌─────────────────────────────┐                            │
│  │  Database                   │                            │
│  │  ├─ users table             │                            │
│  │  ├─ otp_tokens table        │                            │
│  │  └─ user_sessions table     │                            │
│  └─────────────────────────────┘                            │
│                                                               │
│  ┌─────────────────────────────┐                            │
│  │  Email Service              │                            │
│  │  └─ Send OTP emails         │                            │
│  └─────────────────────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 User Registration Flow

```
Start
  │
  ├─► User Clicks "Login/Register" Button in Header
  │
  ├─► AuthModal Opens
  │
  ├─► User Clicks "Register"
  │
  ├─► RegisterForm Displayed (Step 1)
  │
  ├─► User Fills Form:
  │   ├─ Name: "John Doe"
  │   ├─ Email: "john@example.com"
  │   ├─ Username: "johndoe"
  │   ├─ Mobile: "9876543210"
  │   ├─ Password: "Password@123"
  │   └─ Confirm: "Password@123"
  │
  ├─► User Clicks "Register" Button
  │
  ├─► Frontend Validation:
  │   ├─ Check all fields filled
  │   ├─ Validate email format
  │   ├─ Check password length
  │   ├─ Verify passwords match
  │   └─ Validate mobile number (10 digits)
  │
  ├─ [If validation fails]
  │  └─► Show Error Message → User Corrects → Retry
  │
  ├─► POST /api/user/register
  │   └─► Backend Creates User & Sends OTP Email
  │
  ├─► Success: OTP Step Displayed (Step 2)
  │
  ├─► User Enters OTP from Email
  │
  ├─► User Clicks "Verify OTP"
  │
  ├─► POST /api/user/verify-otp
  │   └─► Backend Verifies OTP & Activates Account
  │
  ├─► Success Message Shown
  │
  ├─► Redirected to Login Form
  │
  └─► User Can Now Login
```

## 🔑 User Login Flow

```
Start
  │
  ├─► User Clicks "Login/Register" Button in Header
  │
  ├─► AuthModal Opens (Login Tab by Default)
  │
  ├─► User Enters:
  │   ├─ Email: "john@example.com"
  │   └─ Password: "Password@123"
  │
  ├─► (Optional) User Checks "Remember Me"
  │
  ├─► User Clicks "Login" Button
  │
  ├─► Frontend Validation:
  │   ├─ Email not empty
  │   ├─ Valid email format
  │   ├─ Password not empty
  │   └─ All required fields filled
  │
  ├─ [If validation fails]
  │  └─► Show Error → User Corrects → Retry
  │
  ├─► POST /api/user/login
  │   ├─► Backend Checks Credentials
  │   ├─► Backend Generates JWT Token
  │   └─► Backend Returns Token + User Data
  │
  ├─ [If login fails]
  │  └─► Show Error ("Invalid credentials") → Retry
  │
  ├─► Save Token to localStorage
  │
  ├─► (If "Remember Me" checked) Save Email to localStorage
  │
  ├─► Show Success Message
  │
  ├─► Close AuthModal
  │
  ├─► Header Updates:
  │   ├─ Shows "Welcome back!"
  │   └─ Shows "Logout" Button
  │
  └─► User is Now Authenticated
```

## 🚪 User Logout Flow

```
Start (User is Logged In)
  │
  ├─► User Clicks "Logout" Button in Header
  │
  ├─► Frontend Actions:
  │   ├─ Call authService.logout()
  │   ├─ Remove 'authToken' from localStorage
  │   └─ Update Header State
  │
  ├─► Header Updates:
  │   ├─ Hides "Welcome back!"
  │   ├─ Hides "Logout" Button
  │   └─ Shows "Login/Register" Button
  │
  └─► User Logout Complete
```

## 📊 Component Hierarchy

```
App.jsx
│
├─ Header.jsx ◄─────────────────────────────────┐
│  │                                               │
│  ├─ AuthModal.jsx                              │
│  │  │                                           │
│  │  ├─ LoginForm.jsx                           │
│  │  │  ├─ Email Input                          │
│  │  │  ├─ Password Input                       │
│  │  │  ├─ Remember Me Checkbox                 │
│  │  │  └─ API Call: authService.login()        │
│  │  │                                           │
│  │  └─ RegisterForm.jsx                        │
│  │     ├─ Step 1: Registration Form            │
│  │     │  ├─ Name Input                        │
│  │     │  ├─ Email Input                       │
│  │     │  ├─ Username Input                    │
│  │     │  ├─ Mobile Number Input               │
│  │     │  ├─ Password Input                    │
│  │     │  ├─ Confirm Password Input            │
│  │     │  └─ API Call: authService.register()  │
│  │     │                                        │
│  │     └─ Step 2: OTP Verification             │
│  │        ├─ OTP Input                         │
│  │        └─ API Call: authService.verifyOtp() │
│  │                                             │
│  └─ Header Elements                            │
│     ├─ Logo                                    │
│     ├─ Navigation Menu                        │
│     ├─ Auth Button/Logout                      │
│     └─ Mobile Menu                             │
│                                                 │
└─ Other Components...                           │
                                                  │
Services:                                         │
└─ authService.js ◄─────────────────────────────┘
   ├─ register()
   ├─ login()
   ├─ verifyOtp()
   ├─ logout()
   ├─ getAuthToken()
   └─ isAuthenticated()

Contexts (Optional):
└─ AuthContext.jsx
   ├─ AuthProvider
   └─ useAuth() Hook

Storage:
└─ localStorage
   ├─ authToken (JWT)
   └─ rememberEmail (email)
```

## 🔐 Data Flow for Registration

```
User Input
    │
    ▼
RegisterForm Component
    │
    ├─► Validate Input
    │   └─► If invalid, show error
    │
    ├─► If valid, send to authService
    │
    ▼
authService.register()
    │
    ├─► Create Request Object:
    │   {
    │     "name": "John Doe",
    │     "email": "john@example.com",
    │     "userName": "johndoe",
    │     "mobileNumber": "9876543210",
    │     "password": "Password@123",
    │     "confirmPassword": "Password@123"
    │   }
    │
    ├─► POST to http://localhost:8080/api/user/register
    │
    ▼
Backend Processing
    │
    ├─► Validate inputs
    ├─► Check if email exists
    ├─► Hash password
    ├─► Create user in DB
    ├─► Generate OTP code
    ├─► Send OTP to email
    │
    ▼
Response to Frontend
    │
    ├─► Success: Show OTP Step
    │   └─► User enters OTP
    │       └─► POST /api/user/verify-otp
    │           └─► Backend verifies OTP
    │               └─► Activate account
    │
    └─► Error: Show error message
        └─► User fixes and retries
```

## 🔐 Data Flow for Login

```
User Input
    │
    ├─ Email: "john@example.com"
    ├─ Password: "Password@123"
    └─ Remember Me: (optional)
    │
    ▼
LoginForm Component
    │
    ├─► Validate Input
    │   └─► If invalid, show error
    │
    ├─► If valid, send to authService
    │
    ▼
authService.login()
    │
    ├─► Create Request Object:
    │   {
    │     "email": "john@example.com",
    │     "password": "Password@123"
    │   }
    │
    ├─► POST to http://localhost:8080/api/user/login
    │
    ▼
Backend Processing
    │
    ├─► Find user by email
    ├─► Verify password hash
    ├─► Check if email is verified
    ├─► Generate JWT token
    │
    ▼
Response to Frontend
    │
    {
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiIs...",
      "data": {
        "userId": "user123",
        "email": "john@example.com",
        "name": "John Doe"
      }
    }
    │
    ▼
Frontend Processing
    │
    ├─► Save token: localStorage.setItem('authToken', token)
    ├─► (Optional) Save email if "Remember Me"
    ├─► Update Component State
    ├─► Close Modal
    ├─► Update Header (show Logout button)
    │
    ▼
User is Authenticated
```

## 🧪 Testing Flow Diagram

```
Testing Registration
│
├─► Open Browser
├─► Click "Login/Register" Button
├─► Click "Register" Link
├─► Fill All Form Fields
├─► Click "Register"
├─► Wait for OTP Email (check spam folder)
├─► Enter OTP Code
├─► Click "Verify OTP"
├─► See Success Message
├─► Auto-redirected to Login Tab
└─► ✓ Registration Test Complete

Testing Login
│
├─► Open Browser
├─► Click "Login/Register" Button
├─► Enter Email & Password
├─► (Optional) Check "Remember Me"
├─► Click "Login"
├─► Check localStorage for token
├─► Verify Header shows "Welcome back!"
└─► ✓ Login Test Complete

Testing Logout
│
├─► (After login) Click "Logout" Button
├─► Check localStorage token is removed
├─► Verify Header shows "Login/Register"
└─► ✓ Logout Test Complete

Testing Mobile Responsiveness
│
├─► Resize browser to mobile size
├─► Check modal layout is responsive
├─► Check mobile menu includes auth button
├─► Test touch interactions
└─► ✓ Mobile Test Complete
```

---

This diagram provides a complete overview of how all components interact and the flow of data through the authentication system.
