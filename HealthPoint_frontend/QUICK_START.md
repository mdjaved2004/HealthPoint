# Quick Start Guide - Medical Center React App

## 🚀 Get Started in 5 Minutes

### Step 1: Navigate to Project
```bash
cd C:\Users\HP\Downloads\medicalcenter-react
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
```bash
copy .env.example .env
```

### Step 4: Run Development Servers

**Terminal 1 - React Frontend:**
```bash
npm run dev
```
Runs on: http://localhost:5173

**Terminal 2 - Backend API:**
```bash
npm run server
```
Runs on: http://localhost:5000

### Step 5: Open Browser
Visit: http://localhost:5173

---

## 📋 All Available Commands

```bash
# Development
npm run dev              # Start React dev server
npm run server          # Start Express backend

# Production
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint

# Utilities
npm install             # Install all dependencies
npm pkg set scripts... # Modify package.json scripts
```

---

## 📁 Key Files to Edit

| File | Purpose | Edit For |
|------|---------|----------|
| `src/pages/Home.jsx` | Landing page | Homepage content |
| `src/pages/About.jsx` | About page | Company info |
| `src/pages/Contact.jsx` | Contact form | Contact details |
| `src/components/Header.jsx` | Navigation | Menu links |
| `src/components/Footer.jsx` | Footer | Footer content |
| `server.js` | Backend API | Email settings |
| `.env` | Configuration | API URLs, email creds |

---

## 📧 Email Setup (Optional)

### Using Gmail:
1. Enable 2FA: https://myaccount.google.com/security
2. Get App Password: https://myaccount.google.com/apppasswords
3. Update `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@medicalcenter.com
```

### Using Other Email:
Edit `server.js` line 10 and change email service:
```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook', // Change this
  auth: { /* ... */ }
});
```

---

## 🛠️ Customization Examples

### Add New Navigation Link
Edit `src/components/Header.jsx`:
```jsx
<li><Link to="/new-page">New Page</Link></li>
```

### Create New Page
1. Create `src/pages/NewPage.jsx`
2. Add to `src/App.jsx`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

### Update Home Page Text
Edit `src/pages/Home.jsx` - modify the JSX content

### Change Colors/Styling
Edit `public/assets/css/style.css`

---

## 🐛 Troubleshooting

### Contact Form Not Working
```
✓ Is backend server running? (npm run server)
✓ Check browser console (F12) for errors
✓ Verify .env has correct API URL
```

### Port 5173 Already in Use
```bash
npm run dev -- --port 3000
```

### Port 5000 Already in Use
Change in `.env` and restart server

### Build Fails
```bash
rm -rf node_modules
npm install
npm run build
```

---

## 📦 Project Features

✅ React 19 with Hooks
✅ React Router v7
✅ Express backend
✅ Contact form with email
✅ API endpoints
✅ Responsive design
✅ Testimonials section
✅ Statistics counters
✅ Mobile menu
✅ Bootstrap 5

---

## 🌍 API Endpoints

```
GET  /                    → Server status
POST /api/contact        → Submit contact form
GET  /api/testimonials   → Get testimonials
GET  /api/departments    → Get departments
GET  /api/doctors        → Get doctors
GET  /api/services       → Get services
```

---

## 📱 Pages Available

- `/` - Home
- `/about` - About Us
- `/doctor` - Doctors
- `/department` - Departments
- `/blog` - Blog List
- `/blog/:id` - Blog Details
- `/contact` - Contact Form
- `/elements` - UI Elements

---

## 🎯 Next Steps

1. ✅ Run the app
2. ✅ Test all pages
3. ✅ Configure email
4. ✅ Test contact form
5. ✅ Customize content
6. ✅ Deploy to production

---

## 📞 Support Resources

- README.md - Full documentation
- .env.example - Configuration template
- server.js - Backend code
- src/ - All React components

Happy coding! 🏥
