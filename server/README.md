# Cyber Seminar Registration Backend

A Node.js/Express backend with MongoDB integration for handling user registrations for the Niklaus Solutions Cyber Awareness Seminar.

## Features

- **MongoDB Integration**: Secure storage of registration data
- **Input Validation**: Backend validation with proper error handling
- **Email Confirmations**: Automated email sending for successful registrations
- **RESTful API**: Clean API endpoints for registration and admin access
- **Security**: CORS, input sanitization, and environment variable protection
- **Production Ready**: Configured for deployment on cloud platforms

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Email**: Nodemailer with Gmail SMTP
- **Security**: CORS, input validation, error handling

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── registrationController.js  # Business logic for registrations
├── models/
│   └── Registration.js      # MongoDB schema for registrations
├── routes/
│   └── registration.js      # API route definitions
├── .env                     # Environment variables (local)
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
└── server.js               # Main application entry point
```

## Installation

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - Copy `.env.example` to `.env`
   - Update the environment variables with your actual values

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# MongoDB Atlas Configuration (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cyber-seminar-registration

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Server Port
PORT=5000
```

## Database Setup

### MongoDB Atlas (Required)
1. Create a MongoDB Atlas account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster (M0 tier is sufficient for development)
3. Create a database user with read/write permissions
4. Get your connection string from Atlas dashboard
5. Replace the placeholder values in `MONGODB_URI` with your actual credentials

**Connection String Format:**
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```

**Example:**
```
mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/cyber-seminar-registration
```

### Important Security Notes
- Never commit your actual MongoDB URI to version control
- Use a dedicated database user with minimal required permissions
- Enable IP whitelisting in Atlas for production
- Consider enabling MongoDB Atlas authentication mechanisms

## API Endpoints

### POST /api/register
Register a new user for the seminar.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "9876543210",
  "role": "Student",
  "organization": "ABC University",
  "city": "Mumbai"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful! You will receive a confirmation email shortly.",
  "data": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "role": "Student",
    "status": "Pending",
    "registrationDate": "2024-01-12T10:30:00.000Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Email already registered. Please use a different email address."
}
```

### GET /api/registrations (Admin Only)
Get all registrations (requires authentication in production).

**Success Response (200):**
```json
{
  "success": true,
  "count": 25,
  "data": [...]
}
```

### POST /send-confirmation
Send confirmation email (used internally after successful registration).

## Data Model

### Registration Schema
- **fullName**: String (required, trimmed, max 100 chars)
- **email**: String (required, unique, lowercase, validated)
- **mobileNumber**: String (required, validated for 10-digit Indian numbers)
- **role**: String (enum: 'Student' | 'Employee')
- **organization**: String (required, trimmed, max 200 chars)
- **city**: String (required, trimmed, max 100 chars)
- **registrationDate**: Date (auto-generated)
- **status**: String (enum: 'Pending' | 'Confirmed' | 'Cancelled', default: 'Pending')
- **ipAddress**: String (optional, captured automatically)

## Running the Server

### Development
```bash
npm start
```

The server will start on `http://localhost:5000`

### Production
```bash
NODE_ENV=production npm start
```

## Deployment

### Prerequisites
- Node.js 16+
- MongoDB Atlas account and cluster
- Gmail account with app password

### Cloud Deployment Options
- **Vercel**: Connect GitHub repo, set environment variables
- **Railway**: Automatic deployment from GitHub
- **Render**: Web service deployment
- **Heroku**: Traditional PaaS deployment

### Deployment Steps
1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy

## Security Features

- **Input Validation**: Server-side validation for all inputs
- **Email Uniqueness**: Prevents duplicate registrations
- **CORS Protection**: Configured for specific frontend origin
- **Error Handling**: No stack traces exposed in production
- **Environment Variables**: Sensitive data stored securely
- **IP Tracking**: Optional IP address logging

## Email Configuration

Uses Gmail SMTP for sending confirmation emails. To set up:

1. Enable 2-factor authentication on Gmail
2. Generate an app password
3. Use the app password in `EMAIL_PASS` (not your regular password)

## Testing

### Manual Testing
Use tools like Postman or curl to test API endpoints:

```bash
# Register a user
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "mobileNumber": "9876543210",
    "role": "Student",
    "organization": "Test College",
    "city": "Test City"
  }'
```

### Frontend Integration
The frontend automatically connects to the backend API. Ensure:
- Server is running on port 5000
- Frontend URL is configured in CORS settings
- Environment variables are properly set

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your MongoDB Atlas connection string is correct
   - Check that your IP is whitelisted in Atlas
   - Ensure your database user credentials are correct
   - Verify network connectivity to Atlas

2. **Email Not Sending**
   - Check Gmail credentials
   - Ensure app password is correct
   - Verify Gmail security settings

3. **CORS Errors**
   - Update `FRONTEND_URL` in environment variables
   - Check if server restarted after changes

4. **Validation Errors**
   - Ensure request body matches API specification
   - Check field names and data types

### Logs
Check server console for detailed error messages and connection status.

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Update documentation for API changes
4. Test thoroughly before deployment

## License

This project is part of the Niklaus Solutions Cyber Seminar Registration system.