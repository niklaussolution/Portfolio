# Testing Guide - Niklaus Solutions Website

## 🎯 Quick Start Testing (Mock Backend Mode)

The application is running in **DEMO MODE** with a mock backend. Everything works without needing a real server!

### ✅ What You Should See

When you open the application, you should see:
1. **Blue banner** at the top saying "Demo Mode Active"
2. **Landing page** with orange and white design
3. **No errors** in the browser console (F12)

---

## 🧪 Test Scenarios

### Test 1: Landing Page ✅

**Steps:**
1. Open the application
2. Scroll through the page

**Expected Results:**
- ✅ Orange (#ff7a00) branding visible
- ✅ "Register Now" button prominently displayed
- ✅ "Admin" button in header
- ✅ All sections load: Hero, About, Benefits, Who Can Attend
- ✅ Footer visible at bottom
- ✅ Responsive design works on mobile/tablet

---

### Test 2: Student Registration ✅

**Steps:**
1. Click "Register Now" button
2. Fill in the form:
   - **Name:** John Smith
   - **Email:** john.smith@test.com
   - **Phone:** +1 555-123-4567
   - **DOB:** 2000-01-15
   - **Category:** Student
3. Click "Complete Registration"

**Expected Results:**
- ✅ Form validates all fields
- ✅ Shows loading spinner while processing
- ✅ Redirects to "Thank You" page
- ✅ Thank you page shows success message
- ✅ Browser console shows: "🟡 Using mock backend for registration"
- ✅ Console shows: "Mock registration result: {success: true, ...}"

**Test Variations:**
- Try leaving fields empty → Should show validation errors
- Try invalid email → Should show "Invalid email format"
- Try short phone number → Should show "Invalid phone number"

---

### Test 3: Employee Registration ✅

**Steps:**
1. Go back to home
2. Click "Register Now"
3. Fill in form with **Category: Employee**
   - **Name:** Jane Doe
   - **Email:** jane.doe@company.com
   - **Phone:** +1 555-987-6543
   - **DOB:** 1990-05-20
   - **Category:** Employee
4. Submit

**Expected Results:**
- ✅ Registration succeeds
- ✅ Shows thank you page
- ✅ Different email works (no duplicate error)

---

### Test 4: Duplicate Email Prevention ✅

**Steps:**
1. Try to register again with email: `john.doe@example.com`
   (This email already exists in sample data)

**Expected Results:**
- ✅ Shows error: "This email is already registered"
- ✅ Does not redirect
- ✅ Form stays filled with your data
- ✅ Error message in red box

---

### Test 5: Admin Login ✅

**Steps:**
1. Go to landing page
2. Click "Admin" button
3. Enter credentials:
   - **Email:** niklaussolution@gmail.com
   - **Password:** Niklaus@HsHari3457
4. Click "Login to Dashboard"

**Expected Results:**
- ✅ Shows loading spinner
- ✅ Console shows: "🟡 Using mock backend for registration"
- ✅ Redirects to Admin Dashboard
- ✅ Dashboard loads with statistics

**Test Invalid Login:**
- Wrong password → Shows "Invalid credentials" error
- Wrong email → Shows "Invalid credentials" error

---

### Test 6: Admin Dashboard - Statistics ✅

**Steps:**
1. After logging in, view the dashboard

**Expected Results:**
- ✅ **Total Registrations:** Shows correct count
- ✅ **Students:** Shows count of student registrations
- ✅ **Employees:** Shows count of employee registrations
- ✅ Statistics update when you delete registrations
- ✅ Orange color scheme consistent

**Sample Data Included:**
- 3 pre-loaded registrations:
  1. John Doe (Student)
  2. Jane Smith (Employee)
  3. Alice Johnson (Student)
- Plus any new ones you've added

---

### Test 7: View Registrations Table ✅

**Steps:**
1. In admin dashboard, scroll to "All Registrations" table

**Expected Results:**
- ✅ Table shows all registrations
- ✅ Columns: Name, Email, Phone, DOB, Category, Registered, Actions
- ✅ Category badges colored (blue for Student, green for Employee)
- ✅ Date formatted correctly
- ✅ Delete button (trash icon) visible for each row

---

### Test 8: Search Functionality ✅

**Steps:**
1. In the search box, type "John"
2. Change search type to "Name"
3. Try searching by email: "example.com"
4. Try searching by phone: "555"

**Expected Results:**
- ✅ Table filters in real-time
- ✅ Shows "Found X result(s)" message
- ✅ Search works across all fields when "All Fields" selected
- ✅ Clear search shows all registrations again
- ✅ Empty result shows "No registrations found"

---

### Test 9: Delete Registration ✅

**Steps:**
1. Find a registration in the table
2. Click the trash icon (🗑️) button
3. Confirm deletion in dialog

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Dialog asks "Are you sure?"
- ✅ Clicking "Delete" removes the registration
- ✅ Table updates immediately
- ✅ Statistics update (total count decreases)
- ✅ Console shows: "🟡 Using mock backend for delete"

**Test Cancel:**
- Click "Cancel" → Dialog closes, nothing deleted

---

### Test 10: Export to CSV ✅

**Steps:**
1. Click "Export CSV" button
2. Check your downloads folder

**Expected Results:**
- ✅ CSV file downloads
- ✅ Filename: `registrations_YYYY-MM-DD.csv`
- ✅ File contains all visible registrations
- ✅ Headers: Name, Email, Phone, Date of Birth, Category, Registration Date
- ✅ Data properly formatted with quotes
- ✅ Opens correctly in Excel/Google Sheets

---

### Test 11: Refresh Data ✅

**Steps:**
1. Click "Refresh" button in admin dashboard

**Expected Results:**
- ✅ Loading state shows briefly
- ✅ Data reloads
- ✅ Statistics update
- ✅ Table shows current data

---

### Test 12: Logout ✅

**Steps:**
1. Click "Logout" button in header

**Expected Results:**
- ✅ Redirects to landing page
- ✅ Cannot access admin dashboard without logging in again
- ✅ Blue demo banner still visible

---

### Test 13: Mobile Responsiveness ✅

**Steps:**
1. Resize browser window to mobile size (< 768px)
2. Navigate through all pages

**Expected Results:**
- ✅ Landing page stacks vertically
- ✅ Registration form readable on mobile
- ✅ Admin dashboard table scrolls horizontally
- ✅ Buttons remain clickable
- ✅ No horizontal scroll on page
- ✅ Text remains readable

---

### Test 14: Browser Console Check ✅

**Steps:**
1. Open browser console (F12)
2. Navigate through the application

**Expected Results:**
- ✅ No red errors (except expected "Failed to fetch" if trying real server)
- ✅ Yellow console messages show:
  - "🟡 MOCK BACKEND ENABLED - Using in-memory data"
  - "🟡 Using mock backend for registration"
  - "🟡 Using mock backend for stats"
- ✅ All API calls show in console
- ✅ Network tab shows no failed requests (when using mock)

---

### Test 15: Data Persistence Check ✅

**Steps:**
1. Register a new user
2. Login to admin and verify it's there
3. Refresh the page (F5)
4. Check if data persists

**Expected Results:**
- ⚠️ **In Mock Mode:** Data RESETS on page reload (this is expected!)
- ✅ Sample data (3 registrations) reappears
- ✅ Your new registrations are gone
- ℹ️ This is normal for mock backend
- ℹ️ Real backend would persist data in database

---

## 🔍 Edge Cases to Test

### Test: Special Characters in Name
- Name: "O'Brien-Smith Jr."
- Expected: ✅ Accepts and displays correctly

### Test: International Phone
- Phone: "+44 20 7946 0958"
- Expected: ✅ Accepts international format

### Test: Very Long Name
- Name: "Christopher Alexander Montgomery-Worthington III"
- Expected: ✅ Accepts, truncates in display if needed

### Test: Recent Date of Birth
- DOB: Today's date
- Expected: ✅ Should work (no age validation in current version)

### Test: Multiple Rapid Registrations
- Submit 5 forms quickly
- Expected: ✅ All succeed (no duplicate emails)

### Test: SQL Injection Attempt (Security)
- Email: `test@test.com'; DROP TABLE--`
- Expected: ✅ Sanitized, treated as normal string

### Test: XSS Attempt (Security)
- Name: `<script>alert('xss')</script>`
- Expected: ✅ Escaped, displays as text, does not execute

---

## 📊 Success Criteria

### ✅ All Tests Pass If:

1. **Registration Flow:**
   - Form validates correctly
   - Submissions succeed
   - Thank you page shows
   - Duplicate emails rejected

2. **Admin Flow:**
   - Login works with correct credentials
   - Dashboard loads with data
   - Search filters correctly
   - Delete removes registrations
   - CSV export downloads
   - Statistics are accurate

3. **UI/UX:**
   - Orange branding consistent
   - Responsive on all devices
   - No console errors
   - Loading states show
   - Error messages clear

4. **Security:**
   - Invalid inputs rejected
   - Special characters handled
   - Authentication required for admin
   - No sensitive data in console

---

## 🐛 Known Behaviors (Not Bugs)

### Expected Behaviors:

1. **Data Resets on Page Reload** ✅
   - This is normal in mock mode
   - Real backend would persist data

2. **"Demo Mode Active" Banner** ✅
   - This is intentional
   - Indicates mock backend is active

3. **Sample Data Always Present** ✅
   - 3 registrations always load
   - Helps with testing

4. **Console Logs with 🟡** ✅
   - Indicates mock backend operations
   - Helps with debugging

---

## 🚀 Testing Real Backend (When Deployed)

When switching to real backend:

1. **Change in MockBackend.tsx:**
   ```typescript
   export const USE_MOCK_BACKEND = false;
   ```

2. **Expected Changes:**
   - ❌ Blue "Demo Mode" banner disappears
   - ❌ Console logs without 🟡
   - ✅ Data persists across page reloads
   - ✅ Real database storage
   - ✅ Actual authentication

3. **Same Tests Apply:**
   - Run all tests again
   - Should work identically
   - But with real data persistence

---

## 📝 Test Report Template

Use this to document your testing:

```
TEST DATE: __________
TESTER: __________
BROWSER: __________ (Chrome/Firefox/Safari/Edge)
DEVICE: __________ (Desktop/Mobile/Tablet)

RESULTS:
[ ] Test 1: Landing Page - PASS / FAIL
[ ] Test 2: Student Registration - PASS / FAIL
[ ] Test 3: Employee Registration - PASS / FAIL
[ ] Test 4: Duplicate Email - PASS / FAIL
[ ] Test 5: Admin Login - PASS / FAIL
[ ] Test 6: Dashboard Statistics - PASS / FAIL
[ ] Test 7: View Registrations - PASS / FAIL
[ ] Test 8: Search - PASS / FAIL
[ ] Test 9: Delete - PASS / FAIL
[ ] Test 10: CSV Export - PASS / FAIL
[ ] Test 11: Refresh - PASS / FAIL
[ ] Test 12: Logout - PASS / FAIL
[ ] Test 13: Mobile Responsive - PASS / FAIL
[ ] Test 14: Console Clean - PASS / FAIL
[ ] Test 15: Data Behavior - PASS / FAIL

NOTES:
_____________________________________
_____________________________________

ISSUES FOUND:
_____________________________________
_____________________________________
```

---

## ✨ Happy Testing!

All 15 test scenarios should pass perfectly in mock mode. If you find any issues, they're likely real bugs that need fixing!

**Remember:** The application is fully functional right now. You can demo it, test it, and use it immediately without any backend setup! 🎉
