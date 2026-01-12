# Email Server Setup Guide

## 🚀 Quick Setup

### 1. Configure Gmail App Password
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use this app password (not your regular password)

### 2. Update Environment Variables
Edit `server/.env`:
```
EMAIL_USER=niklaussolution@gmail.com
EMAIL_PASS=rfrs xdok papd evbn
```

### 3. Install Server Dependencies
```bash
cd server
npm install
```

### 4. Start the Email Server
```bash
npm run server
# or from root directory:
# npm run server
```

### 5. Test the Setup
1. Start your frontend: `npm run dev`
2. Register a user
3. Check that confirmation email is sent

## 📧 Email Template
The server sends a professional HTML email with:
- Personalized greeting
- Registration confirmation
- Next steps information
- Company branding

## 🔧 Troubleshooting
- **Port 5000 already in use**: Change port in server.js
- **Gmail authentication failed**: Double-check app password
- **CORS errors**: Make sure server is running on localhost:5000
- **Emails not sending**: Check Gmail security settings

## 📁 Project Structure
```
server/
├── server.js      # Express server with Nodemailer
├── .env          # Email credentials (NEVER commit)
└── package.json  # Server dependencies
```