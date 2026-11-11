# CORS Error Fix - Login Issue

## Problem
Error: `Unexpected token 'I', "Invalid CORS request" is not valid JSON`

This error occurs when:
- Backend is rejecting the request with a CORS error
- Backend returns HTML error page instead of JSON
- Frontend tries to parse HTML as JSON and fails

---

## Solution: Backend CORS Configuration

### For Spring Boot Backend

Add CORS configuration to your Spring Boot application:

#### Option 1: Using `@CrossOrigin` Annotation (Simple)
```java
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(
    origins = "http://localhost:5173",  // Vite dev server port
    allowCredentials = "true",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
public class UserController {
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO userLoginDTO, ...) {
        // Your login logic
        return ResponseEntity.ok(Map.of("message", "Login successful"));
    }
}
```

#### Option 2: Using Global CORS Configuration (Recommended)
Create a new configuration class:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")  // Vite dev port
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

#### Option 3: Using Spring Security CORS (For Secured APIs)
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

---

## Frontend Configuration (Already Updated)

### Vite Proxy Enhanced
```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8081',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/api'),
      secure: false,
      ws: true,
      logLevel: 'debug'  // Shows proxy logs
    }
  }
}
```

### Auth Service Enhanced Error Handling
```javascript
// authService.js - Now handles CORS errors gracefully
- Checks Content-Type before parsing JSON
- Detects HTML error responses
- Provides helpful error messages
- Handles CORS-specific errors
```

---

## Important: Frontend to Backend Port Mapping

| Service | Port | URL |
|---------|------|-----|
| Vite Dev Server | 5173 | http://localhost:5173 |
| Spring Boot Backend | 8081 | http://localhost:8081 |
| API Proxy Path | 5173 | /api/* → proxied to localhost:8081 |

**During Development:**
- Frontend makes request to: `http://localhost:5173/api/user/login`
- Vite proxy redirects to: `http://localhost:8081/api/user/login`
- Backend receives request with proper CORS headers

---

## Testing CORS

### Step 1: Restart Backend
```bash
# After adding CORS configuration
# Restart your Spring Boot application
```

### Step 2: Restart Frontend Dev Server
```bash
# Terminal in project root
npm run dev
```

### Step 3: Test Login
1. Open http://localhost:5173 in browser
2. Click "Login/Register"
3. Try logging in with valid credentials
4. Check browser console (F12) for errors

### Step 4: Check Console Logs
If using `logLevel: 'debug'` in Vite config, you'll see proxy logs:
```
[vite] http proxy: /api/user/login -> http://localhost:8081/api/user/login
```

---

## Common Issues & Solutions

### Issue 1: "Invalid CORS request" Error
**Solution:** 
- Ensure backend has CORS configured
- Check that `allowCredentials = true` is set
- Verify allowed origins include `http://localhost:5173`

### Issue 2: Session Cookie Not Sent
**Solution:**
- Both frontend and backend must have `credentials: 'include'`
- Frontend: Already added to all auth requests
- Backend: Must set `allowCredentials = true`

### Issue 3: "Cannot parse JSON" After Login
**Solution:**
- Verify backend returns proper JSON response
- Check Content-Type header is `application/json`
- Use PostMan/Insomnia to test backend directly

### Issue 4: 405 Method Not Allowed
**Solution:**
- Ensure backend has POST method allowed
- Check @PostMapping annotation exists
- Verify OPTIONS method is allowed for preflight

---

## Production Deployment Changes

When deploying to production, update:

### Backend CORS Configuration
```java
// Change from localhost to production domain
configuration.setAllowedOrigins(Arrays.asList("https://yourdomain.com"));
```

### Vite Config
```javascript
// Remove dev proxy, use direct API calls
// In production: API calls go directly to your backend domain
```

### API Base URL
```javascript
// authService.js
// Change from relative path to absolute URL in production
const API_BASE_URL = process.env.VITE_API_URL || '/api/user';
```

---

## Verification Checklist

- [ ] Backend has CORS configuration added
- [ ] `allowedOrigins` includes `http://localhost:5173`
- [ ] `allowCredentials = true` is set
- [ ] Backend allows POST, GET, OPTIONS methods
- [ ] Frontend dev server running on port 5173
- [ ] Backend running on port 8081
- [ ] Browser console shows no CORS errors
- [ ] Login request returns JSON (not HTML)
- [ ] User data displays after successful login

---

## Additional Resources

**Spring Boot CORS Documentation:**
https://spring.io/guides/gs/cors/

**MDN CORS Guide:**
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

**Vite Proxy Documentation:**
https://vitejs.dev/config/server-options.html#server-proxy

---

## Quick Fix Checklist

```
1. Add @CrossOrigin or CorsConfig to backend ✓
2. Set allowedOrigins = "http://localhost:5173" ✓
3. Set allowCredentials = true ✓
4. Allow POST, GET, OPTIONS methods ✓
5. Restart backend server ✓
6. Restart frontend: npm run dev ✓
7. Test login again ✓
```

If issue persists after all steps, check:
- Backend logs for errors
- Browser Network tab (F12) - check request/response headers
- Backend is actually restarted with new config
- No firewall blocking localhost:8081

---

**Status**: Instructions provided for complete CORS fix.
