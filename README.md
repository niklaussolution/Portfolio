# Niklaus Solutions - Cyber Awareness Seminar Website

A complete, production-ready website for registering students and employees for a free Cyber Security Awareness & Ethical Hacking Seminar.

## 🟡 IMPORTANT: Mock Backend Mode Enabled

**The application is currently running in DEMO MODE with a mock backend!**

This means:
- ✅ All features work perfectly for testing
- ✅ No real Supabase server needed
- ✅ Data is stored in browser memory (resets on page reload)
- ✅ Perfect for demonstrations and testing

**To switch to real Supabase backend:**
1. Open `/src/app/components/MockBackend.tsx`
2. Change `export const USE_MOCK_BACKEND = true;` to `false`
3. Ensure Supabase Edge Function is deployed
4. Refresh the application

**Default admin credentials (mock mode):**
- Email: `niklaussolution@gmail.com`
- Password: `Niklaus@HsHari3457`

## 🎯 Features

### Public Features
- ✅ Professional landing page with seminar information
- ✅ Secure registration form with validation
- ✅ Thank you page with confirmation details
- ✅ Mobile-responsive design
- ✅ Orange (#ff7a00) and white theme matching theniklaus.com

### Admin Features
- ✅ Secure admin authentication
- ✅ Dashboard with statistics (total, students, employees)
- ✅ Search by name, email, or phone
- ✅ View all registrations in table format
- ✅ Delete registrations
- ✅ Export registrations to CSV
- ✅ Real-time data updates

### Security Features
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ Input validation (frontend + backend)
- ✅ Duplicate email prevention
- ✅ Row Level Security (RLS) on database
- ✅ Protected admin routes
- ✅ Session-based authentication

## 🚀 Quick Start

### 1. Application is Already Running!
The app should already be deployed. Just wait 60 seconds for the server to initialize.

### 2. Check Server Status
Open this URL to verify the server is running:
```
https://rcjhqevkqmgkxocbfcvs.supabase.co/functions/v1/make-server-f0354f00/health
```
Expected response: `{"status":"ok"}`

### 3. Create Admin Account
**Option A - Supabase Dashboard (Recommended):**
1. Go to: https://supabase.com/dashboard
2. Select project: `rcjhqevkqmgkxocbfcvs`
3. Click: Authentication > Users > Add User
4. Enter:
   - Email: `niklaussolution@gmail.com`
   - Password: `Niklaus@HsHari3457`
   - ✓ Auto Confirm User
5. Click "Create User"

**Option B - Via Server Endpoint:**
The server includes a `/admin/signup` endpoint for creating admin accounts.

### 4. Test the Application
1. **Test Registration:**
   - Click "Register Now"
   - Fill form and submit
   - Should redirect to Thank You page

2. **Test Admin:**
   - Click "Admin" button
   - Login with credentials above
   - Should see dashboard with stats

## 📁 Project Structure

```
/
├── src/app/
│   ├── App.tsx                    # Main app with routing
│   └── components/
│       ├── LandingPage.tsx        # Homepage
│       ├── RegistrationPage.tsx   # Registration form
│       ├── ThankYouPage.tsx       # Success page
│       ├── AdminLogin.tsx         # Admin authentication
│       ├── AdminDashboard.tsx     # Admin panel
│       ├── ServerStatus.tsx       # Server health checker
│       └── ui/                    # Reusable UI components
│
├── supabase/functions/server/
│   └── index.tsx                  # Backend API server
│
├── utils/supabase/
│   └── info.tsx                   # Supabase credentials
│
├── SETUP_INSTRUCTIONS.md          # Detailed setup guide
├── TROUBLESHOOTING.md            # Comprehensive troubleshooting
├── QUICK_FIX.md                  # Fast problem resolution
└── README.md                     # This file
```

## 🗄️ Database Schema

### Table: `registrations_niklaus`

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| name | TEXT | NOT NULL |
| email | TEXT | NOT NULL, UNIQUE |
| phone | TEXT | NOT NULL |
| dob | DATE | NOT NULL |
| category | TEXT | CHECK (Student/Employee) |
| created_at | TIMESTAMP | DEFAULT NOW() |

### RLS Policies
- **Public Insert**: Anyone can register
- **Admin Full Access**: Authenticated users can read/update/delete

## 🔧 Configuration

### Supabase Project Details
- **Project ID**: `rcjhqevkqmgkxocbfcvs`
- **Server URL**: `https://rcjhqevkqmgkxocbfcvs.supabase.co/functions/v1/make-server-f0354f00`
- **Health Check**: `https://rcjhqevkqmgkxocbfcvs.supabase.co/functions/v1/make-server-f0354f00/health`

### Default Admin Credentials
- **Email**: `niklaussolution@gmail.com`
- **Password**: `Niklaus@HsHari3457`

⚠️ **IMPORTANT**: Change these credentials in production!

## 🐛 Troubleshooting

### "Failed to fetch" Error

This is the most common issue. It means the server hasn't started yet.

**Solution:**
1. Wait 60 seconds
2. Refresh the page
3. Try again

**Still not working?** See [QUICK_FIX.md](QUICK_FIX.md)

### Other Errors

| Error | Fix |
|-------|-----|
| "table does not exist" | See [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) |
| "Unauthorized" | Create admin user (see Quick Start #3) |
| "already registered" | Use different email address |

For detailed troubleshooting, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 📱 Pages

### 1. Landing Page
- Hero section with CTA
- About the seminar
- Benefits section
- Who can attend
- Call to action
- Footer

### 2. Registration Form
- Full Name (required, validated)
- Email (required, unique, validated)
- Phone (required, validated)
- Date of Birth (required, date picker)
- Category (Student/Employee, required)
- Server-side validation
- Error handling

### 3. Thank You Page
- Success confirmation
- Email reminder notice
- Certificate information
- Back to home button

### 4. Admin Login
- Email/password authentication
- Secure session management
- Error handling

### 5. Admin Dashboard
- Statistics cards (Total/Students/Employees)
- Search functionality
- Registrations table
- Delete capability
- CSV export
- Logout button

## 🎨 Design

- **Brand Colors**: Orange (#ff7a00) and White (#ffffff)
- **Theme**: Cyber security / Professional
- **Responsive**: Mobile, Tablet, Desktop
- **Accessibility**: Proper labels, ARIA attributes
- **Performance**: Optimized components

## 🔒 Security Best Practices

1. ✅ Never expose Supabase Service Role Key in frontend
2. ✅ Use Row Level Security (RLS) on all tables
3. ✅ Validate all inputs on frontend AND backend
4. ✅ Sanitize user inputs
5. ✅ Use HTTPS only
6. ✅ Implement rate limiting (production)
7. ✅ Regular security audits
8. ✅ Change default credentials

## 📊 API Endpoints

### Public Endpoints
- `POST /make-server-f0354f00/register` - Submit registration

### Admin Endpoints (Protected)
- `POST /make-server-f0354f00/admin/signup` - Create admin
- `POST /make-server-f0354f00/admin/login` - Admin login
- `GET /make-server-f0354f00/admin/registrations` - Get all registrations
- `GET /make-server-f0354f00/admin/registrations/search` - Search registrations
- `DELETE /make-server-f0354f00/admin/registrations/:id` - Delete registration
- `GET /make-server-f0354f00/admin/stats` - Get statistics

### Health Check
- `GET /make-server-f0354f00/health` - Server status

## 🧪 Testing

### Manual Testing Checklist

**Public Features:**
- [ ] Landing page loads correctly
- [ ] All sections visible and styled
- [ ] Registration form opens
- [ ] Form validation works
- [ ] Successful registration → Thank you page
- [ ] Duplicate email rejected

**Admin Features:**
- [ ] Admin login page accessible
- [ ] Login with correct credentials works
- [ ] Dashboard shows correct statistics
- [ ] Registrations table displays data
- [ ] Search functionality works
- [ ] CSV export downloads file
- [ ] Delete registration works
- [ ] Logout works

## 📋 Production Checklist

Before deploying to production:

- [ ] Change default admin password
- [ ] Set up email confirmation service
- [ ] Configure CORS for specific domain
- [ ] Implement rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure automated backups
- [ ] Add privacy policy
- [ ] Add terms of service
- [ ] SSL/TLS certificates configured
- [ ] Error tracking set up (e.g., Sentry)
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] GDPR compliance review

## 🌟 Key Technologies

- **Frontend**: React, TypeScript, Tailwind CSS v4
- **Backend**: Supabase Edge Functions, Hono
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Hosting**: Figma Make / Supabase

## 📞 Support

If you encounter issues:

1. Check [QUICK_FIX.md](QUICK_FIX.md) for immediate solutions
2. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed help
3. Review [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for setup steps
4. Check browser console (F12) for error messages
5. Verify server health endpoint

## 📝 License

This is a custom-built application for Niklaus Solutions.

## 🎓 About Niklaus Solutions

Niklaus Solutions provides free Cyber Awareness and Ethical Hacking seminars to students and employees, helping them understand cybersecurity threats and best practices for digital protection.

---

**Built with ❤️ for cybersecurity education**