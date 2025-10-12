# LearnifyAI - Learning Management System (LMS)
**LearnifyAI** is a full-featured Learning Management System that allows students to learn seamlessly and instructors to manage courses efficiently. It includes multi-role support, AI-powered course content generation, secure payments, and more.


## 🌐 Live Demo

👉 [Visit LearnifyAI Live](https://learnifyai-phi-azure.vercel.app/)


---

## ✨ Features

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

### ✨ Core Functionalities
- **Authentication System**: Secure login, signup, and password reset.
- **File Uploads**: Support for images and video lectures through **Multer**.
- **AI Integration**: Generate course descriptions, prerequisites, and key takeaways automatically.
- **Payment Integration**: Stripe for payments.
- **Course Management**: Add, edit, remove courses and lectures.
- **Profile Management**: Users, instructors, and admins can update profiles anytime.
- **Search & Filter**: Easily find courses.

---

## ⚙️ Installation

1. Clone the repository:  
```bash
git clone https://github.com/yogesh-chaturvedi/LMS
cd LMS
```
2. Setup Backend:
```bash
cd Backend
npm install

#Create a .env file in the backend directory
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SK=your_stripe_key
API_KEY=your_gemini_api_key

npm start
```

3. Setup Frontend
```bash
cd Frontend
npm install

#Create a .env file in the frontend directory
STRIPE_PK=your_stripe_publishable_key
VITE_API_URL=on_which_your_backend_runs

npm start
```

---

## 📁 Project Structure
```bash
/Frontend
├── src
│ ├── Components
| ├── context
│ ├── pages
│   └── Dashboard
    └── Instructor
│ └── App.jsx

/Backend
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
- Multer for file upload
- joi for Input Validation

### AI Integration

- Google Generative AI (Gemini API)

---

## 👤 Author
- Name: Yogesh Chaturvedi
- GitHub: [@yogesh-chaturvedi](https://github.com/yogesh-chaturvedi)