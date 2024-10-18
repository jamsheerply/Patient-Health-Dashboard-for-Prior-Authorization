# ClearPath Prior Authorization: Patient Health Dashboard

[Previous sections remain the same until Quick Start Guide]

## 🚀 Quick Start Guide

There are two ways to run this application:

### Method 1: Using Run Script (Recommended)

## ⚠️ IMPORTANT REMINDER

**This application must be run using Git Bash on Windows. Command Prompt or PowerShell will NOT work correctly.**

### Prerequisites

- Node.js (v18.18.0)
- MongoDB
- Git Bash (Required for Windows users)

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jamsheerply/Patient-Health-Dashboard-for-Prior-Authorization.git
   cd Patient-Health-Dashboard-for-Prior-Authorization
   ```

2. **Environment Configuration**
   Create a `.env` file in the /server directory with the following variables:

   ```env
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   MONGODB_URI="your_mongodb_uri"
   TOKEN_SECRET="your_token_secret"
   EMAIL="your_email@example.com"
   PASS="your_email_app_password"
   ```

3. **Run Services**
   ```bash
   ./run-services.sh
   ```
4. Visit http://localhost:5173 in your browser to access the application

### Method 2: Manual Installation (Running Services Separately)

If you prefer to run the frontend and backend separately, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jamsheerply/Patient-Health-Dashboard-for-Prior-Authorization.git
   cd Patient-Health-Dashboard-for-Prior-Authorization
   ```

2. **Setup Backend (First Terminal)**

   ```bash
   cd server
   npm install
   # Create .env file as shown above
   npm start
   ```

   Backend will run on http://localhost:5000

3. **Setup Frontend (Second Terminal)**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Frontend will run on http://localhost:5173

### Ports and Access

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Verification Steps

1. Backend is running when you see: "Server is running on port 5000"
2. Frontend is running when you see: "Local: http://localhost:5173/"
3. Visit http://localhost:5173 in your browser to access the application

## 💡 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact & Support

For questions, support, or collaboration:

- **Email**: jamsheerpayyoli@gmail.com
- **GitHub Issues**: For bug reports and feature requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Jamsheer](https://github.com/jamsheerply)
