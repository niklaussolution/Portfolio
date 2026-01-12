# Niklaus Solutions - Troubleshooting Guide

## Error: "Failed to fetch"

This error indicates that the frontend cannot connect to the Supabase Edge Function server. Here are the solutions:

### Solution 1: Wait for Server Initialization (Most Common)
The Supabase Edge Function takes 30-60 seconds to deploy and start up on first run.

**Steps:**
1. Wait 60 seconds after opening the application
2. Try the registration or login again
3. If it still doesn't work, proceed to Solution 2

### Solution 2: Verify Server is Running
Check if the Supabase Edge Function is deployed:

**Using the Application:**
1. Open the browser console (F12 or right-click > Inspect > Console)
2. Look for log messages showing the server URL
3. The URL should be: `https://rcjhqevkqmgkxocbfcvs.supabase.co/functions/v1/make-server-f0354f00`

**Manual Health Check:**
Open this URL in a new tab:
```
https://rcjhqevkqmgkxocbfcvs.supabase.co/functions/v1/make-server-f0354f00/health
```

**Expected Response:**
```json
{"status":"ok"}
```

If you see this, the server is running correctly.

### Solution 3: Check Network/CORS
If the health check fails:

1. **Check your internet connection**
2. **Clear browser cache**: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
3. **Try a different browser** (Chrome, Firefox, Edge)
4. **Disable browser extensions** that might block requests
5. **Check if you're behind a firewall** that blocks Supabase

### Solution 4: Create the Database Table Manually

If the server is running but registrations fail, the database table might not exist.

**Steps:**
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (`rcjhqevkqmgkxocbfcvs`)
3. Click on "SQL Editor" in the left sidebar
4. Run this SQL:

```sql
-- Create the registrations table
CREATE TABLE IF NOT EXISTS public.registrations_niklaus (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  dob DATE NOT NULL,
  category TEXT CHECK (category IN ('Student','Employee')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.registrations_niklaus ENABLE ROW LEVEL SECURITY;

-- Create public insert policy
CREATE POLICY "Public Insert"
ON public.registrations_niklaus
FOR INSERT
WITH CHECK (true);

-- Create admin access policy
CREATE POLICY "Admin Full Access"
ON public.registrations_niklaus
FOR ALL
USING (auth.role() = 'authenticated');
```

5. Click "Run" to execute the SQL

### Solution 5: Create Admin User

For admin login to work, you need to create an admin account:

**Option A: Via Supabase Dashboard**
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User"
3. Enter:
   - Email: `niklaussolution@gmail.com`
   - Password: `Niklaus@HsHari3457`
4. Check "Auto Confirm User"
5. Click "Create User"

**Option B: Via SQL (if you have access)**
```sql
-- Insert admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'niklaussolution@gmail.com',
  crypt('Niklaus@HsHari3457', gen_salt('bf')),
  NOW(),
  NULL,
  '',
  NULL,
  '',
  NULL,
  '',
  '',
  NULL,
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}',
  FALSE,
  NOW(),
  NOW(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL
);
```

## Specific Error Messages

### "This email is already registered"
**Cause:** You're trying to register with an email that already exists in the database.

**Solution:** Use a different email address.

### "Unauthorized"
**Cause:** The admin login token is invalid or expired.

**Solution:** 
1. Logout and login again
2. Clear browser cache
3. Verify admin user exists in database

### "Table 'registrations_niklaus' does not exist"
**Cause:** The database table hasn't been created.

**Solution:** Follow Solution 4 above to create the table manually.

## Testing Checklist

Use this checklist to verify everything is working:

- [ ] Open the application - landing page loads
- [ ] Check browser console (F12) - no JavaScript errors
- [ ] Open health check URL - returns `{"status":"ok"}`
- [ ] Click "Register Now" - registration form appears
- [ ] Fill form with valid data and submit
- [ ] See "Registration Successful" page
- [ ] Click "Admin" button - login page appears
- [ ] Login with: `niklaussolution@gmail.com` / `Niklaus@HsHari3457`
- [ ] Admin dashboard loads showing statistics
- [ ] See your test registration in the table
- [ ] Search functionality works
- [ ] Can export CSV
- [ ] Can delete a registration

## Still Having Issues?

### Debug Information to Collect:

1. **Browser Console Logs:**
   - Open browser console (F12)
   - Try the action that's failing
   - Copy all red error messages
   - Copy the full "Attempting registration to:" or "Attempting login to:" URL

2. **Network Tab:**
   - Open browser DevTools (F12)
   - Go to "Network" tab
   - Try the action again
   - Find the failed request
   - Check the "Response" tab for error details

3. **Server Logs:**
   - Go to Supabase Dashboard > Edge Functions
   - Click on the `make-server-f0354f00` function
   - Check the logs for errors

### Common Solutions Summary:

1. **Wait 60 seconds** for server to initialize
2. **Refresh the page**
3. **Clear browser cache**
4. **Check health endpoint**: https://rcjhqevkqmgkxocbfcvs.supabase.co/functions/v1/make-server-f0354f00/health
5. **Create database table** via SQL Editor
6. **Create admin user** via Supabase Dashboard
7. **Try different browser**
8. **Disable browser extensions**

## Production Deployment Notes

For deploying to production:

1. **Environment Variables:** Ensure all Supabase credentials are properly set
2. **CORS Configuration:** Update CORS to allow only your production domain
3. **Rate Limiting:** Implement rate limiting on server routes
4. **Email Service:** Configure proper email service for confirmations
5. **Security:** Change default admin password immediately
6. **Monitoring:** Set up error tracking and logging
7. **Backups:** Configure automated database backups

## Contact

If you continue to experience issues, check:
- Supabase Status Page: https://status.supabase.com/
- Supabase Documentation: https://supabase.com/docs
- Figma Make Support
