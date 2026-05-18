# 🚀 TaskFlow — Project Management SaaS Platform

<div align="center">

### Modern MERN Stack Project & Task Management System

A powerful **role-based SaaS application** built with the **MERN Stack** that helps teams manage projects, assign tasks, monitor progress, and collaborate efficiently through a clean and modern workflow experience.

<br/>

🌐 **Live Demo:**
[https://independent-rejoicing-production-07c4.up.railway.app/](https://independent-rejoicing-production-07c4.up.railway.app/)

</div>

---

# ✨ Overview

**TaskFlow** is a full-stack project management platform inspired by modern SaaS products like Jira, Trello, and ClickUp. It provides a complete workflow system for teams with project organization, task tracking, dashboards, analytics, and role-based collaboration.

Designed with a modern **glassmorphism UI**, responsive layouts, and production-style architecture, TaskFlow demonstrates real-world scalable MERN stack development practices.

---

# 🧠 Core Features

## 👤 Authentication & Authorization

Secure authentication system with role-based access control.

### Features

* 🔐 User Registration & Login
* 🔑 JWT Authentication
* 🛡️ Protected Routes
* 👥 Role-Based Access (Admin / Member)
* 🔄 Forgot Password & Reset Password Flow
* 🔒 Password Hashing using Bcrypt.js

---

# 📁 Project Management

Admin users can fully manage projects and team members.

### Admin Capabilities

* ➕ Create Projects
* 👀 View All Projects
* ❌ Delete Projects
* 👥 Assign Multiple Members
* 📋 View Assigned Team Members
* 🧹 Cascade Delete Related Tasks

---

# ✅ Task Management

Efficient project task workflow with status tracking and priorities.

### Task Features

* 📝 Create Tasks under Projects
* 👤 Assign Tasks to Users
* ⚡ Dynamic Status Updates
* 🚦 Priority Levels:

  * Low
  * Medium
  * High

### Task Workflow

* 📌 TODO
* 🚧 IN PROGRESS
* ✅ DONE

### Permissions

* 👑 Only Admins can Delete Tasks

---

# 💬 Comments System

Collaborative discussion system for tasks.

### Features

* 💭 Add Comments to Tasks
* 🔄 Real-Time Comment Refresh
* 👤 User-Based Comment Attribution

---

# 📊 Dashboard & Analytics

Powerful dashboard insights for both Admins and Members.

## 👑 Admin Dashboard

* 👥 Total Users
* 📁 Total Projects
* ✅ Total Tasks
* 🎯 Completed Tasks
* 📈 Productivity Insights

## 📉 Charts & Visualizations

Built using **Recharts**

* 🥧 Pie Chart → Task Status Distribution
* 📊 Bar Chart → Task Priority Analysis

## 👤 Member Dashboard

* 📌 Personal Assigned Tasks
* 📈 Progress Tracking
* 📊 Productivity Overview

---

# 🎨 UI / UX Highlights

TaskFlow focuses heavily on modern UI aesthetics and user experience.

### Design Features

* 🌙 Dark SaaS-Inspired Interface
* ✨ Glassmorphism Effects
* 📱 Fully Responsive Design
* 🎬 Smooth Animations & Transitions
* 🧩 Modern Card-Based Layout
* 📌 Jira-Like Workflow Experience

---

# 🛠️ Tech Stack

## Frontend

| Technology       | Purpose            |
| ---------------- | ------------------ |
| React.js         | Frontend Framework |
| React Router DOM | Routing            |
| Axios            | API Requests       |
| Tailwind CSS     | Styling            |
| Recharts         | Data Visualization |
| React Hot Toast  | Notifications      |

---

## Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Runtime Environment |
| Express.js | Backend Framework   |
| MongoDB    | Database            |
| Mongoose   | ODM                 |
| JWT        | Authentication      |
| Bcrypt.js  | Password Hashing    |

---

# 📂 Project Structure

```bash
taskflow/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/DevShukla001/Task-Management.git
cd Task-Management
```

---

# 🔧 Backend Setup

```bash
cd backend
npm install
```

## Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

## Start Backend Server

```bash
npm start
```

---

# 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Environment Variables

| Variable     | Description               |
| ------------ | ------------------------- |
| `MONGO_URI`  | MongoDB Connection String |
| `JWT_SECRET` | JWT Secret Key            |
| `CLIENT_URL` | Frontend URL              |

---

# 📡 API Overview

## 🔑 Authentication Routes

```http
POST /auth/register
POST /auth/login
POST /auth/forgot-password
POST /auth/reset-password/:token
```

---

## 📁 Project Routes

```http
GET    /projects
POST   /projects
DELETE /projects/:id
```

---

## ✅ Task Routes

```http
GET    /tasks
POST   /tasks
PUT    /tasks/:id/status
DELETE /tasks/:id
```

---

## 💬 Comment Routes

```http
GET  /comments/:taskId
POST /comments
```

---

# 🧩 Key Highlights

✅ Fully Role-Based Architecture
✅ Scalable REST API Structure
✅ Real-World SaaS Workflow
✅ Clean Frontend/Backend Separation
✅ Production-Style Folder Structure
✅ Reusable Components Architecture
✅ Secure Authentication System
✅ Modern Dashboard Analytics

---



---

# 🚀 Future Improvements

* 📌 Drag & Drop Kanban Board
* ⚡ Real-Time Updates using WebSockets
* 🔔 Notification System
* 📎 File Attachments
* 📝 Activity Logs & Audit Trail
* 🔍 Advanced Search & Filters
* 💬 Team Chat System
* 📅 Calendar Integration

---



---

# 🤝 Contributing

Contributions are welcome!

## Steps

```bash
# Fork the repository

# Create a new branch
git checkout -b feature-name

# Commit changes
git commit -m "Added new feature"

# Push to GitHub
git push origin feature-name
```

Then open a Pull Request 🚀

---

# 👨‍💻 Author

## Dev Shukla

🔗 GitHub:
[https://github.com/DevShukla001/Task-Management](https://github.com/DevShukla001)

---


