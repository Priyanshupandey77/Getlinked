# 🔗 Getlinked — Developer Social Platform

🌐 **Live App:** https://getlinked-two-psi.vercel.app/
🚀 A modern full-stack social platform where developers connect, share ideas, and grow together.

---

## 🧠 What is Getlinked?

**Getlinked** is a production-ready social networking platform inspired by LinkedIn — built from scratch using the MERN stack.

It enables developers to:

* Connect with others
* Share posts
* Engage through likes & comments
* Receive real-time-like notifications

---

## ✨ Core Features

### 🔐 Authentication System

* JWT-based authentication
* Access + Refresh token flow
* Secure protected routes
* Persistent login sessions

---

### 👤 User & Social Graph

* User profiles with dynamic avatars
* Follow / Unfollow system
* Real-time UI updates for relationships

---

### 📝 Posts & Smart Feed

* Create and share posts
* Personalized feed based on following
* Optimized MongoDB queries for feed generation

---

### ❤️ Engagement System

* Like / Unlike posts (instant UI update)
* Comment system with live feedback
* Interaction-driven UX

---

### 🔔 Notification System

* Follow, Like, and Comment notifications
* Comment preview inside notifications
* Unread notification badge in navbar

---

### 🔍 Smart Search

* Search users by name (regex-based)
* Follow/Unfollow directly from search
* UI synced with backend state

---

### 🎨 Modern UI/UX

* Clean card-based design
* Responsive layout (mobile + desktop)
* Skeleton loading (smooth experience)
* Micro-interactions & animations

---

## 🛠️ Tech Stack

### ⚛️ Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### 🧠 Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication

### ☁️ Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🧩 System Architecture

* RESTful API design
* Component-based frontend structure
* MVC pattern (backend)
* Middleware for authentication
* Optimized data fetching (feed, notifications)

---

## 🔐 Security Highlights

* Password hashing using bcrypt
* JWT-based authentication
* HTTP-only cookies for refresh tokens
* Protected routes & middleware validation

---

## 📂 Project Structure

```id="gtl123"
getlinked/
 ├── frontend/
 │   ├── components/
 │   ├── pages/
 │   ├── api/
 │
 ├── backend/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
```

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```id="gtl124"
git clone https://github.com/Priyanshupandey77/Getlinked.git
cd getlinked
```

---

### 2️⃣ Backend Setup

```id="gtl125"
cd backend
npm install
npm run dev
```

Create `.env` file:

```id="gtl126"
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

---

### 3️⃣ Frontend Setup

```id="gtl127"
cd frontend
npm install
npm run dev
```

---

## 🚀 Key Engineering Highlights

* 🔁 **Bi-directional follow system**
* ⚡ **Optimistic UI updates**
* 🔄 **Token-based session management**
* 📊 **Efficient feed generation using MongoDB queries**
* 🔔 **Event-driven notification system**

---

## 🌟 Future Enhancements

* Real-time notifications (WebSockets)
* Media uploads (images/videos)
* Infinite scroll feed
* Messaging system (chat)
* Profile customization

---

## 🙌 Inspiration

Inspired by LinkedIn, Twitter, and modern social platforms.

---

## 📬 Contact

If you like this project or want to collaborate, feel free to reach out!

---

⭐ **Star this repo if you found it useful!**
