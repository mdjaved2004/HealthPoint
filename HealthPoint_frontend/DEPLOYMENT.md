# Deployment Guide - Medical Center React App

## 🚀 Deployment Options

### Option 1: Local/Development Server (Easiest)

**Requirements:**
- Node.js installed
- Port 5173 and 5000 available

**Steps:**
```bash
cd medicalcenter-react
npm install
npm run dev          # Terminal 1
npm run server       # Terminal 2
```

Visit: `http://localhost:5173`

---

### Option 2: Vercel (Recommended for Frontend)

**Steps:**
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and deploy

**Environment Variables on Vercel:**
- Add `.env` variables in project settings
- Set `VITE_API_BASE_URL` to your backend URL

---

### Option 3: Netlify (Frontend)

**Steps:**
1. Create account on Netlify
2. Connect your GitHub repository
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Deploy

**Configure Build:**
Create `netlify.toml`:
```toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

---

### Option 4: Heroku (Full Stack)

**Steps:**
1. Create Heroku account
2. Install Heroku CLI
3. Create `Procfile`:
```
web: node server.js
```

4. Deploy:
```bash
heroku create medicalcenter-app
git push heroku main
```

5. Set environment variables:
```bash
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
```

---

### Option 5: AWS (Scalable)

**Frontend on S3 + CloudFront:**
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

**Backend on EC2:**
1. Launch EC2 instance
2. SSH into instance
3. Clone repository
4. Run `npm install && npm run server`

---

### Option 6: Docker + Any Cloud

**Dockerfile:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000 5173
CMD ["sh", "-c", "npm run dev & npm run server"]
```

**Build & Run:**
```bash
docker build -t medicalcenter-app .
docker run -p 5000:5000 -p 5173:5173 medicalcenter-app
```

---

## 🔧 Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run lint` (no errors)
- [ ] Test all pages work
- [ ] Test contact form
- [ ] Check for console errors
- [ ] Review API endpoints
- [ ] Update contact information
- [ ] Customize company details

### Performance
- [ ] Run `npm run build` successfully
- [ ] Check bundle size
- [ ] Test on slow network (DevTools)
- [ ] Optimize images
- [ ] Minify CSS

### Security
- [ ] Remove sensitive data from code
- [ ] Use environment variables for secrets
- [ ] Update `.env` for production
- [ ] Enable HTTPS/SSL
- [ ] Set up CORS properly
- [ ] Validate all form inputs
- [ ] Update email configuration

### Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Test mobile responsiveness
- [ ] Test on iOS device
- [ ] Test on Android device

### Configuration
- [ ] Update API_BASE_URL for production
- [ ] Configure email service
- [ ] Set admin email address
- [ ] Update company info
- [ ] Review all links
- [ ] Check phone numbers
- [ ] Update address/location

---

## 📋 Environment Variables for Production

Create `.env.production`:
```env
VITE_API_BASE_URL=https://your-api-domain.com
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@yourdomain.com
PORT=5000
```

---

## 🌐 Domain & DNS Setup

### For Frontend (Vercel/Netlify):
1. Go to DNS provider (GoDaddy, Namecheap, etc.)
2. Add CNAME record:
   - Name: `www`
   - Value: `your-vercel-domain.vercel.app`
3. Add A record for root domain

### For Backend (Heroku/AWS):
1. Use provided domain or custom domain
2. Update CORS settings in `server.js`
3. Configure SSL certificate

---

## 📊 Monitoring & Maintenance

### Production Monitoring
```bash
# Monitor logs
heroku logs --tail

# Check performance
npm run build -- --report

# Monitor API
curl https://your-api.com/api/services
```

### Regular Maintenance
- [ ] Update dependencies monthly
- [ ] Check for security vulnerabilities
- [ ] Monitor error logs
- [ ] Back up data
- [ ] Review API usage
- [ ] Update content

---

## 🔐 SSL/HTTPS Setup

### Vercel/Netlify:
- Automatic HTTPS enabled ✓

### Heroku:
```bash
heroku certs:auto:enable
```

### Custom Domain (AWS):
1. Buy SSL certificate (AWS Certificate Manager)
2. Configure in CloudFront
3. Redirect HTTP to HTTPS

---

## 💰 Estimated Costs

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Pro | $20/month |
| Netlify | Pro | $19/month |
| Heroku | Standard | $25/month |
| AWS | Varies | $50+/month |
| Custom VPS | Basic | $10-30/month |

---

## 🚨 Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### API Connection Error
- Check API_BASE_URL in .env
- Verify backend is running
- Check CORS settings
- Review firewall rules

### Email Not Sending
- Verify email credentials
- Check app password (Gmail)
- Review email service settings
- Check email logs

### Performance Issues
- Enable caching
- Optimize images
- Use CDN
- Implement lazy loading
- Monitor database queries

---

## 📞 Support for Each Platform

- **Vercel**: vercel.com/docs
- **Netlify**: docs.netlify.com
- **Heroku**: devcenter.heroku.com
- **AWS**: aws.amazon.com/support

---

## 🎯 Next Steps After Deployment

1. Test production URL
2. Set up monitoring
3. Configure analytics
4. Set up backups
5. Create maintenance schedule
6. Document deployment process
7. Train team members
8. Plan scaling strategy

---

**Deployment Complete!** 🎉

Your Medical Center app is now live and ready for patients!
