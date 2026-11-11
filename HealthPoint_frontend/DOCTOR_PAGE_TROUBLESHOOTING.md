# Doctor Page - Troubleshooting Guide

## Issue: "Failed to load doctors" Error

If you're seeing error messages when trying to load the doctors page, here are the solutions:

---

## ✅ Quick Checklist

1. **Backend Server Running?**
   - Check if your Spring Boot backend is running on `http://localhost:8080`
   - Message in console: "Fetching doctors from: http://localhost:8080/api/doctor/all"

2. **API Endpoint Exists?**
   - Verify your backend has: `GET /api/doctor/all`
   - Response format should be:
     ```json
     {
       "doctors": [
         {
           "doctorId": 1,
           "name": "Dr. Name",
           "email": "email@example.com",
           "mobileNumber": "1234567890",
           "specialization": "Specialty",
           "experience": 10,
           "fees": 500,
           "hospitalName": "Hospital",
           "languages": "English,Hindi",
           "rating": 4.5
         }
       ]
     }
     ```

3. **CORS Enabled?**
   - Backend must allow requests from `http://localhost:3000` (or your frontend URL)
   - Add to your Spring Boot controller or config:
     ```java
     @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
     @GetMapping("/all")
     public ResponseEntity<?> getAllDoctors() {
       // Your code
     }
     ```

---

## 🔧 Solutions

### Solution 1: Start Your Backend Server

**Windows:**
```bash
mvn clean install
mvn spring-boot:run
```

**Or run from IDE:**
- Right-click project → Run As → Spring Boot App
- Or use Run menu in your IDE

**Verify it's running:**
- Open: `http://localhost:8080/api/doctor/all` in browser
- Should see doctor data in JSON format

---

### Solution 2: Check Browser Console

**Steps:**
1. Open Chrome/Firefox
2. Press `F12` to open DevTools
3. Go to **Network** tab
4. Click on Doctor page
5. Look for request to: `http://localhost:8080/api/doctor/all`
6. Click on it and check:
   - Status (should be 200)
   - Response tab (see the actual data returned)
   - Console tab (see error messages)

---

### Solution 3: Enable CORS on Backend

**In your Spring Boot Controller:**
```java
package com.doctor.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:8080"})
public class DoctorController {
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(Map.of("doctors", doctors));
    }
}
```

**Or add Global CORS Config:**
```java
package com.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000", "http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true);
            }
        };
    }
}
```

---

### Solution 4: Verify Backend Data

**Add sample data to your database:**
```sql
INSERT INTO doctors (doctor_id, name, email, mobile_number, specialization, experience, fees, hospital_name, languages, rating) 
VALUES 
('1', 'Dr. Amit Sharma', 'amit@gmail.com', '9876543210', 'Cardiologist', '10', '800', 'Apollo Hospital', 'English,Hindi', '4.5'),
('2', 'Dr. Sarah Johnson', 'sarah@gmail.com', '9876543211', 'Neurology', '8', '600', 'City Medical Center', 'English,Spanish', '4.7');
```

---

### Solution 5: Check Firewall/Network

- Windows Firewall blocking port 8080?
- Try: `netstat -ano | findstr :8080` (Windows)
- Or: `lsof -i :8080` (Mac/Linux)
- If blocked, add exception in firewall

---

## 🧪 Testing Steps

### Test 1: Backend Connectivity
Open in browser:
```
http://localhost:8080/api/doctor/all
```

You should see:
- JSON response with doctor data
- OR CORS error (fix this first)
- OR 404 error (endpoint doesn't exist)

### Test 2: Frontend Console Logs
1. Open frontend in browser
2. Press F12
3. Go to **Console** tab
4. Refresh page
5. Look for logs:
   - ✅ "Fetching doctors from: http://localhost:8080/api/doctor/all"
   - ✅ "Response status: 200"
   - ✅ "Fetched data: [...]"
   - ❌ Any errors?

### Test 3: Network Tab
1. Press F12
2. Go to **Network** tab
3. Refresh page
4. Look for request: `all` or `doctor`
5. Click on it and check:
   - **Headers**: Shows correct URL and method
   - **Preview**: Shows JSON response
   - **Response**: Full response data

---

## 📋 Common Error Messages

### Error: CORS Error / Network Request Blocked
**Cause:** Backend doesn't have CORS enabled
**Solution:** Add `@CrossOrigin` to your controller (see Solution 3)

### Error: 404 Not Found
**Cause:** Endpoint doesn't exist
**Solution:** Verify your backend has `GET /api/doctor/all`

### Error: 500 Internal Server Error
**Cause:** Backend error
**Solution:** Check your backend logs for details

### Error: Connection Refused
**Cause:** Backend not running
**Solution:** Start your Spring Boot server

### Error: Timeout
**Cause:** Backend too slow or not responding
**Solution:** Check backend logs, restart backend

---

## ✨ Fallback Behavior

**Good news!** If backend is down:
- Frontend shows ⚠️ warning message
- Sample doctors data is displayed anyway
- Users can still browse and test the app
- Filters and search still work with sample data

---

## 📞 Need Help?

### Check These Files:
1. Check backend logs for errors
2. Check browser console (F12) for error details
3. Check network requests (F12 → Network tab)
4. Verify API response format matches expected JSON

### Quick Debug:
```bash
# Test if backend is running
curl http://localhost:8080/api/doctor/all

# Should return JSON like:
# {"doctors":[{"doctorId":1,"name":"Dr. Name",...}]}
```

---

## 🎯 Expected Behavior (After Fixing)

✅ Doctors page loads without warning
✅ Doctors list displays with real data from backend
✅ Filters work correctly
✅ Search functionality works
✅ "Book Appointment" button works
✅ "Be a Consultant" form displays

---

**Last Updated:** March 10, 2026
