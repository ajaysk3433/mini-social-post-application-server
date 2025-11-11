

# 🌐 Mini Social Post Application

This project implements a simplified, single-page social media feed application covering core full-stack development concepts, including **user authentication**, **real-time data manipulation**, and **persistent storage**.

---



## ✨ Key Features

The application mimics the essential functionality of a social media feed, allowing basic user interaction and ensuring persistent data management.

### 👤 Account Management (Authentication)
- Simple **Sign Up** and **Login** using email and password.
- User details are securely stored in a **MongoDB** database.
- Authentication handled via **JWT tokens**.

### 📝 Post Creation
- Authenticated users can create new posts containing **text content only**.
- Text content is **mandatory** for creating a post.

### 📰 Public Feed
- Displays a **centralized public feed** showing posts from all users.
- Each post includes:
    - Username
    - Text content
    - Real-time **like** and **comment** counts

### 💬 Interaction (Like & Comment)
- Any authenticated user can **like** or **comment** on any post.
- Tracks and stores usernames of users who liked or commented.
- UI updates **instantly** to reflect like/comment changes.

---

## 🛠️ Technology Stack

| Component  | Technology  | Role |
|-------------|--------------|------|
| **Frontend** | React.js | Client-side user interface |
| **Backend** | Node.js (Express) | RESTful API for authentication and data |
| **Database** | MongoDB (Atlas) | Persistent storage via Mongoose |
| **Styling** | Basic CSS | Responsive and clean design |

---

## ⚙️ Backend Setup (`mini-social-post-application-server`)

The backend handles **authentication**, **post management**, and **database operations**.

### 🧩 Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Git](https://git-scm.com/)

---

## 🚀 Installation

1. **Navigate into the server directory:**
   ```bash
   cd mini-social-post-application-server


2. **Install required dependencies:**

   ```bash
   npm install
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the **root** of `mini-social-post-application-server` and define the following variables:

| Variable       | Description                                                 | Example                                     |
| -------------- | ----------------------------------------------------------- | ------------------------------------------- |
| `PORT`         | The port the Express server runs on                         | `3000`                                      |
| `DB_USER_NAME` | MongoDB Atlas database username                             | `social_app_user`                           |
| `DB_PASSWORD`  | MongoDB Atlas database password                             | `MySecretPass123`                           |
| `DB_NAME`      | Name of the database to use | `socialdb`                  |
| `JWT_SECRET`   | A long, secure key used for signing JWT tokens              | `aVeryLongAndSecureSecretKeyForSigningJWTs` |

Your MongoDB connection string in code will look like this:

```
mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@${DB_NAME}/socialdb?retryWrites=true&w=majority
```

---

## 🏃‍♂️ Running the Server

### Development Mode (with Nodemon)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Once started, the backend API will be available at:

```
http://localhost:3000/
```




---

## 🧠 Core Functionalities Summary

| Feature                | Description                               |
| ---------------------- | ----------------------------------------- |
| **Sign Up / Login**    | Register and authenticate users securely  |
| **Create Post**        | Submit text-only posts                    |
| **View Feed**          | See all posts from all users              |
| **Like / Comment**     | Interact with posts in real time          |
| **JWT Authentication** | Protect routes and maintain user sessions |

---

## 🧑‍💻 Author

**Name:** Ajay Singh
**Project:** Mini Social Post Application
**Tech Stack:** MERN (MongoDB, Express, React, Node.js)

---


