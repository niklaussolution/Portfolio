# Quick Fix for "Failed to fetch" Error

## Immediate Actions (Do These First)

### Step 1: Wait and Retry
The Supabase Edge Function needs time to deploy on first run.

**Action:** Wait 60 seconds, then refresh the page and try again.

---

### Step 2: Check Server Health
Open this URL in a new browser tab:
```
https://rcjhqevkqmgkxocbfcvs.supabase.co/functions/v1/make-server-f0354f00/health
```

**Expected Result:** You should see: `{"status":"ok"}`

**If you see this:** ✅ Server is running! Proceed to Step 3.

**If you get an error:** ❌ Server needs to be deployed. Proceed to Step 5.

---

### Step 3: Test Registration
1. Go back to the app
2. Click "Register Now"
3. Fill in the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: +1 555-123-4567
   - DOB: 2000-01-01
   - Category: Student
4. Submit

**If successful:** ✅ Registration works! 

**If error "table does not exist":** Proceed to Step 4.

**If still "Failed to fetch":** Check your browser console (F12) for errors.

---

### Step 4: Create Database Table
**Only do this if Step 3 failed with "table does not exist"**

1. Go to: https://supabase.com/dashboard
2. Login and select project `rcjhqevkqmgkxocbfcvs`
3. Click "SQL Editor" in left sidebar
4. Copy and paste this SQL:

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

ALTER TABLE public.registrations_niklaus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Insert"
ON public.registrations_niklaus
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin Full Access"
ON public.registrations_niklaus
FOR ALL
USING (auth.role() = 'authenticated');
```

5. Click "Run"
6. Go back to app and try registration again

---

### Step 5: Create Admin User
**For admin login to work**

1. Go to: https://supabase.com/dashboard
2. Select project `rcjhqevkqmgkxocbfcvs`
3. Click "Authentication" > "Users"
4. Click "Add User" button
5. Fill in:
   - **Email:** `niklaussolution@gmail.com`
   - **Password:** `Niklaus@HsHari3457`
   - **✓ Check:** "Auto Confirm User"
6. Click "Create User"
7. Go back to app, click "Admin", and login

---

## Alternative: Browser Console Check

1. Open the app
2. Press **F12** (or right-click > Inspect)
3. Go to **Console** tab
4. Try registration or login
5. Look for messages starting with:
   - "Attempting registration to:"
   - "Response status:"
   - Any red error messages

**Copy these logs** - they show exactly what's failing.

---

## What Should Happen

### ✅ When Everything Works:

1. **Health Check:** Returns `{"status":"ok"}`
2. **Registration:** Form submits → Thank You page appears
3. **Admin Login:** Login form → Dashboard with statistics
4. **Dashboard:** Shows registrations, search works, can export CSV

### ❌ Common Error Messages:

| Error | Meaning | Fix |
|-------|---------|-----|
| "Failed to fetch" | Can't reach server | Wait 60s, check health endpoint |
| "table does not exist" | Database not set up | Run SQL from Step 4 |
| "Unauthorized" | Admin not created | Create admin user (Step 5) |
| "already registered" | Duplicate email | Use different email |

---

## Still Not Working?

### Check These:

1. ✅ Internet connection working?
2. ✅ Browser cache cleared? (Ctrl+Shift+Delete)
3. ✅ Tried different browser? (Chrome, Firefox)
4. ✅ Browser extensions disabled?
5. ✅ Waited full 60 seconds?

### Get Debug Info:

Open browser console (F12) and run:
```javascript
// Check what URL is being used
console.log('Server URL:', `https://${projectId}.supabase.co/functions/v1/make-server-f0354f00`);

// Test health endpoint directly
fetch('https://rcjhqevkqmgkxocbfcvs.supabase.co/functions/v1/make-server-f0354f00/health')
  .then(r => r.json())
  .then(d => console.log('Health check:', d))
  .catch(e => console.error('Health check failed:', e));
```

---

## Success Indicators

You'll know it's working when:

- ✅ Health endpoint returns `{"status":"ok"}`
- ✅ Browser console shows "Response status: 200"
- ✅ Registration redirects to Thank You page
- ✅ Admin login redirects to Dashboard
- ✅ Dashboard shows statistics (even if 0)

---

## Emergency Fallback

If absolutely nothing works after trying all steps:

1. Check Supabase status: https://status.supabase.com/
2. Verify project ID is correct: `rcjhqevkqmgkxocbfcvs`
3. See full troubleshooting guide: `TROUBLESHOOTING.md`
4. Check server logs in Supabase Dashboard > Edge Functions

---

## Pro Tip

The app has a built-in server status checker! 

**On the landing page**, the app automatically checks if the server is online. If you see a yellow warning banner at the top, the server isn't ready yet - just wait a minute and refresh.
