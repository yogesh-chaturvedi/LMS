# eLearning - Learning Management System (LMS)
**eLearning** is a full-featured Learning Management System that allows students to learn seamlessly and instructors to manage courses efficiently. It includes multi-role support, AI-powered course content generation, secure payments, and more.

---

## Features
### User Roles

**1. User (Student)**
- Browse, search, sort and filter courses.
- Buy courses using **Stripe**.
- Watch purchased courses and track learning progress.
- Update profile information (name, email, profile image) anytime.

**2. Instructor**
- Create new courses and edit existing courses and lectures.
- Upload course images and video lectures using **Multer**.
- Generate course descriptions, prerequisites, and key takeaways using **AI (Gemini API)**, with option to edit.
- View all courses but cannot purchase their own courses.
- Update profile information anytime.

**3. Admin**
- Manage instructors, users and courses (add, edit, remove).
- View all courses and instructor information.
- Update profile information anytime.

---

### Core Functionalities
- **Authentication System**: Secure login, signup, and password reset.
- **File Uploads**: Support for images and video lectures through **Multer**.
- **AI Integration**: Generate course descriptions, prerequisites, and key takeaways automatically.
- **Payment Integration**: Stripe for payments.
- **Course Management**: Add, edit, remove courses and lectures.
- **Profile Management**: Users, instructors, and admins can update profiles anytime.
- **Search & Filter**: Easily find courses.

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/yogesh-chaturvedi/LMS
cd LMS
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables for MongoDB, Stripe, and Gemini API.

4. Start the server:
```bash
npm start
```

---

## Project Structure
```bash
/frontend
├── src
│ ├── Components
| ├── context
│ ├── pages
│   └── Dashboard
│ └── App.jsx

/backend
├── Controllers
├── Middlewares
├── Models
├── Routes
└── main.js
.env
```

---

## 🚀 Tech Stack
### Frontend

- React.js
- Tailwind CSS
- Axios
- React Router
- Stripe SDK

### Backend

- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- dotenv for config
- JWT for Authentication
- bcrypt for Password Hashing
- cors for API Security
- joi for Input Validation

### AI Integration

- Google Generative AI (Gemini API)

---

## 👤 Author
- Name: Yogesh Chaturvedi
- GitHub: @yogesh-chaturvedi