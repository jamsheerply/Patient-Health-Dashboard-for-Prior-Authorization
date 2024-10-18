# ClearPath Prior Authorization: Patient Health Dashboard

A full-stack application for healthcare providers to manage patient health data and streamline prior authorization workflows.

## 🚀 Features

- Patient dashboard for health data visualization
- Prior authorization request submission and management
- Integration with health data APIs
- Secure authentication and data handling

## 🛠 Tech Stack

- **Frontend:** React, Axios, Tailwind CSS, React Icons, Shadcn UI
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Tools:** Nodemon, dotenv, Nodemailer

## 🔗 Important Links (All Live and Functional)

- [API Documentation](https://documenter.getpostman.com/view/29406159/2sAXxWYopK) - Live Postman Documentation
- [Backend Deployment](https://patient-production.up.railway.app/) - Live Backend Server
- [Frontend Deployment](https://patient-health-dashboard-for-prior-authorization-six.vercel.app/) - Live Frontend Application

## 🚀 Quick Start

1. Clone the repo
2. Install dependencies for frontend (`cd client && npm install`) and backend (`cd /server && npm install`)
3. Set up environment variables (see below)
4. Run backend and frontend simultaneously:
   - In one terminal:
     ```bash
     cd /server && npm run dev
     ```
   - In another terminal:
     ```bash
     cd /client && npm run dev
     ```

## 🔐 Environment Variables

### Server (.env file in /server folder)

```
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
MONGODB_URI="your_mongodb_uri"
TOKEN_SECRET="your_token_secret"
EMAIL="your_email@example.com"
PASS="your_email_app_password"
```

### Client (.env file in /client folder)

```
VITE_API_URL=http://localhost:5000
```

Make sure to replace placeholder values with your actual configuration.

## 🔑 Demo Access

- Email: user4@gmail.com
- Password: Admin@123

For detailed setup instructions, contribution guidelines, and more, please check our [README.md](link-to-your-readme-file).
