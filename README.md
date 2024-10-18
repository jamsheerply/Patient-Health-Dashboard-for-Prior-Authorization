# ClearPath Prior Authorization: Patient Health Dashboard for Prior Authorization

## Objective

Develop a full-stack application where healthcare providers can view and manage patient health data, focusing on prior authorization workflows. This will involve creating a patient dashboard, integrating health data, and building APIs for submitting and managing prior authorization requests.

## Technologies Used

- **Frontend**: React, Axios, Tailwind CSS, React Icons, Shadcn UI
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Development Tools**: Nodemon, dotenv, Nodemailer

Api Documentation
Api-docs:
Back end:
front end:

## Installation

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jamsheerply/Patient-Health-Dashboard-for-Prior-Authorization

   Navigate to the project directory:
   ```

bash
Copy code
cd Patient-Health-Dashboard-for-Prior-Authorization
Install dependencies for both frontend and backend:

For the frontend:
bash
Copy code
cd client
npm install
For the backend:
bash
Copy code
cd ../server
npm install
Create a .env file in the server folder for environment variables:

env
Copy code

# Server configuration

PORT=5000

# CORS frontend URL (change to your frontend app's URL)

FRONTEND_URL=http://localhost:5173

# Environment

NODE_ENV=development

# Database connection string (replace with your actual MongoDB connection URI)

MONGODB_URI=

# Token secret

TOKEN_SECRET="taskMangementAplicationToken"

# Nodemailer setup

EMAIL="learnvoyage2024@gmail.com"
PASS="ijwf xuuo mdbz aufu"
Run the backend:

bash
Copy code
cd server
npm run dev
Run the frontend:

bash
Copy code
cd ../client
npm run dev
Visit the application locally: Open your browser and go to http://localhost:5173.
