# Niklaus Solutions - Setup Instructions

## Database Setup

The application will automatically attempt to create the required table when the server starts. However, if you need to manually set up the database, follow these steps:

### 1. Access Supabase SQL Editor

Go to your Supabase project dashboard > SQL Editor

### 2. Create the Registrations Table

```sql
CREATE TABLE IF NOT EXISTS public.registrations_niklaus (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  dob DATE NOT NULL,
  category TEXT CHECK (category IN ('Student','Employee')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Enable Row Level Security (RLS)

```sql
ALTER TABLE public.registrations_niklaus ENABLE ROW LEVEL SECURITY;
```

### 4. Create RLS Policies

```sql
-- Allow public insert (for registration form)
CREATE POLICY "Public Insert"
ON public.registrations_niklaus
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users (admins) full access
CREATE POLICY "Admin Full Access"
ON public.registrations_niklaus
FOR ALL
USING (auth.role() = 'authenticated');
```

## Admin Account Setup

### Create Admin User

Use the Supabase dashboard or run this SQL:

```sql
-- This will be done through the application's signup endpoint
-- Default admin credentials (change after first login):
-- Email: niklaussolution@gmail.com
-- Password: Niklaus@HsHari3457
```

Or use the server endpoint to create an admin:

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-f0354f00/admin/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "niklaussolution@gmail.com",
    "password": "Niklaus@HsHari3457",
    "name": "Admin"
  }'
```

## Application Features

### Public Pages

1. **Landing Page** - Homepage with seminar information
2. **Registration Page** - Form for student/employee registration
3. **Thank You Page** - Confirmation page after successful registration

### Admin Panel

Access at `/admin` (click Admin button in header)

**Default Login:**
- Email: `niklaussolution@gmail.com`
- Password: `Niklaus@HsHari3457`

**Features:**
- View total registrations count
- View students and employees separately
- Search by name, email, or phone
- Filter registrations
- Delete registrations
- Export data to CSV

## Security Features

✅ SQL Injection Prevention
✅ XSS Protection
✅ Email uniqueness validation
✅ Input sanitization
✅ Session-based admin auth
✅ Protected API routes
✅ Row Level Security (RLS)

## Important Notes

1. **Change Default Password**: After first login, create a new admin user with a secure password
2. **Data Protection**: This is a prototype. For production, ensure proper data encryption and compliance with data protection regulations (GDPR, etc.)
3. **Email Verification**: Emails are auto-confirmed since no email server is configured
4. **Table Name**: Must be exactly `registrations_niklaus` for the application to work

## Testing the Application

### Test Public Registration

1. Navigate to homepage
2. Click "Register Now"
3. Fill in the form with valid data
4. Submit and verify Thank You page appears

### Test Admin Panel

1. Click "Admin" in header
2. Login with credentials
3. Verify dashboard shows statistics
4. Test search functionality
5. Test CSV export
6. Test delete functionality

## Troubleshooting

**Table not found error:**
- Manually create the table using SQL above
- Ensure table name is exactly `registrations_niklaus`
- Check that table is in `public` schema

**Unauthorized errors:**
- Verify RLS policies are created
- Check that admin user is created and confirmed
- Verify access token is being sent correctly

**Duplicate email error:**
- This is expected behavior - prevents duplicate registrations
- User should use different email address

## Brand Colors

- Primary: `#ff7a00` (Orange)
- Secondary: `#ffffff` (White)
- Text: Dark gray / Black
- Background: Light gray shades

## Production Deployment Checklist

- [ ] Change admin password
- [ ] Set up proper email service for confirmations
- [ ] Configure CORS for specific domain
- [ ] Set up SSL/TLS certificates
- [ ] Implement rate limiting
- [ ] Add logging and monitoring
- [ ] Set up automated backups
- [ ] Review and test all security policies
- [ ] Add privacy policy and terms of service
- [ ] Configure proper error tracking
