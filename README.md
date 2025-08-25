Live Link (https://mini-drive-delta.vercel.app)
📂 Mini-Drive Application

A lightweight  Drive–like application built with Node.js, Express, MongoDB, and AWS S3 for file storage.
It supports user authentication, folder management, file upload/download/share and delete

🚀 Features
    
     *User authentication (JWT-based)
    *Create root and nested folders
    *Upload and manage files (S3 integration)
    *Generate shareable file links
    *Download, and delete files

Clipboard & native sharing support

⚙️ Setup Instructions

1️⃣ Clone the repository

git clone https://github.com/your-username/mini-drive.git

cd mini-drive

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in the root directory and configure it (see .env.example below).

4️⃣ Run in development
npm run dev

5️⃣ Build & start in production
npm run build
npm start

🔑 Environment Variables

Create a .env file in the root directory:

# Server
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mini-drive
JWT_SECRET=your_jwt_secret_key
ACCESS_TOKEN_SECRET=myaccesssecret
REFRESH_TOKEN_SECRET=myrefreshsecret
CLIENT_URL=http://localhost:5173

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=mini-drive-bucket

📡 API Documentation
🔐 Auth
=>POST /api/auth/register

Register a new user.
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

=>POST /api/auth/login

Login with email & password.
Body:

{
  "email": "john@example.com",
  "password": "password123"
}


=>Response: JWT token

📂 Folders
POST /api/private/folders

Create a folder.
Body:

{
  "name": "Projects",
  "parentId": "root"
}

GET /api/private/folders

Fetch folder contents (files + subfolders).

📁 Files
=>POST /api/private/upload

Upload a file (multipart form-data).

=>GET /api/private/

List the file with the link to Share and Download

DELETE /api/private/:id

For Deleting the file.

🧪 Sample.env.example
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mini-drive
JWT_SECRET=supersecretkey123

AWS_ACCESS_KEY_ID=EXAMPLEKEY
AWS_SECRET_ACCESS_KEY=EXAMPLESECRET
AWS_REGION=ap-south-1
S3_BUCKET_NAME=mini-drive-bucket

🛠️ Tech Stack
   *Backend: Node.js, Express, TypeScript
   *Database: MongoDB (Mongoose)
   *Storage: AWS S3
   *Auth: JWT + Bcrypt
