# 🎓 Student Management System (Student Hub)

A full-stack web application built using the MERN stack to manage student records, attendance, and performance efficiently with role-based access control.

---

## 🚀 Features

* 🔐 **Authentication & Authorization**

  * JWT-based login system
  * Role-based access (Admin & Student)

* 👨‍🎓 **Student Management**

  * Add, update, delete student profiles
  * Manage student data including grades and attendance

* 📊 **Dashboard**

  * Organized view of student information
  * Easy navigation for admins and students

* ⚡ **State Management**

  * Zustand for lightweight and efficient global state handling

* 🔄 **CRUD Operations**

  * Full Create, Read, Update, Delete functionality

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* Tailwind CSS
* Zustand

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

**Authentication:**

* JSON Web Tokens (JWT)

---

## 🧩 Architecture

Client (React) → API (Express/Node) → Database (MongoDB)

* Frontend sends API requests
* Backend handles business logic and authentication
* MongoDB stores user and student data

---

## 📁 Folder Structure (Basic)

/client → React frontend
/server → Node.js backend
/models → MongoDB schemas
/routes → API routes
/controllers → Business logic

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

### 2. Install dependencies

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd server
npm install
```

### 3. Environment Variables

Create a `.env` file in `/server`:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the application

**Backend:**

```bash
npm run dev
```

**Frontend:**

```bash
npm start
```

---

## 🔑 Key Learnings

* Implemented secure authentication using JWT
* Built RESTful APIs with Express.js
* Managed global state efficiently using Zustand
* Designed scalable backend structure
* Improved debugging and optimization skills

---

## 🚧 Future Improvements

* Real-time updates (WebSockets)
* Analytics dashboard (charts, insights)
* File upload support (assignments, documents)
* Deployment (Render / Vercel)

---

## 📌 Author

Pushpak Bhagat
GitHub: https://github.com/griffithhhhhh
LinkedIn: https://linkedin.com/in/pushpak-bhagat

---

## 📜 License

This project is for educational purposes.
